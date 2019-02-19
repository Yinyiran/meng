<template>
  <div class="file-manage" :class="{'select':limit}" @click.stop>
    <!-- 图片列表 -->
    <el-tabs v-model="currentTab" @tab-click="tabClick">
      <el-tab-pane label="全部图片" name="all">
        <span class="img-wrap" :class="{checked:isSelect(img)}" v-for="(img,index) in imageList" :key="index" @click="selectImage(img)">
          <img :src="img.src" alt="" class="image">
          <span class="checkbox" v-if="limit">
            <i class="el-icon-check"></i>
          </span>
          <div class="cover" v-if="!limit">
            <el-button class="btn" size="mini" title="删除图片" type="danger" icon="el-icon-delete" circle plain @click.stop="deleImg(img)"></el-button>
            <el-button class="btn" size="mini" title="大图查看" type="primary" icon="el-icon-view" circle plain @click.stop="viewImg(img)"></el-button>
            <el-button class="btn" title="复制图片地址" size="mini" type="success" icon="el-icon-share" circle plain @click.stop="copyAddress(img.src)"></el-button>
          </div>
        </span>
      </el-tab-pane>
      <el-tab-pane label="分类显示" name="classify">
        <div v-for="(list,key) in classifyList" :key="key">
          <h3 class="classify-titile">{{ClassifyImages[key]}}：</h3>
          <span class="img-wrap" :class="{checked:isSelect(img)}" v-for="(img,index) in list" :key="index" @click="selectImage(img)">
            <img :src="img.src" alt="" class="image">
            <span class="checkbox" v-if="limit">
              <i class="el-icon-check"></i>
            </span>
            <div class="cover" v-if="!limit">
              <el-button class="btn" size="mini" title="删除图片" type="danger" icon="el-icon-delete" circle plain @click.stop="deleImg(img)"></el-button>
              <el-button class="btn" size="mini" title="大图查看" type="primary" icon="el-icon-view" circle plain @click.stop="viewImg(img)"></el-button>
              <el-button class="btn" title="复制图片地址" size="mini" type="success" icon="el-icon-share" circle plain @click.stop="copyAddress(img.src)"></el-button>
            </div>
          </span>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 底部 -->
    <div class="footer">
      <!-- 分页 -->
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20, 50, 100, 200, 500]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" background :total="allCount">
      </el-pagination>
    </div>
    <!-- 图片预览 -->
    <div class="view-img" v-if="isViewImg" @click="closeView">
      <i class="el-icon-close" @click="closeView"></i>
      <img class="img" :src="curImg.src" alt="" @click.stop>
      <div class="info-wrap" @click.stop>
        <span class="info">宽度:{{curImg.width}}px</span>
        <span class="info">高度:{{curImg.height}}px</span>
        <span class="info">类型:{{curImg.type}}</span>
        <span class="info">大小:{{curImg.size}}kb</span>
      </div>
    </div>

  </div>
</template>
<script>
import Vue from "vue";
import { Tabs, TabPane, Pagination, Button } from "element-ui";
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Pagination);
Vue.use(Button);
import { Message, Http, API, Cache, ClassifyImages } from "../service";
export default {
  props: {
    selectList: {
      type: Array,
      default() {
        return [];
      }
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      imageList: [],
      classifyList: [],
      allImages: [],
      ClassifyImages: ClassifyImages,
      curImg: null,
      currentTab: "all",
      isViewImg: false,
      page: 1,
      size: Cache.get("image_list_page") || 20,
      allCount: null
    };
  },
  created() {
    this.getPageImage();
  },
  methods: {
    getPageImage() {
      Http.get("getAllImages", { page: this.page, size: this.size }).then(
        res => {
          res.data.data.forEach(img => {
            img.src = API.imgSrc + img.name;
          });
          this.imageList = this.allImages = res.data.data;
          this.allCount = res.data.count;
          this.getClassifyImages();
        }
      );
    },
    getClassifyImages() {
      let classImages = {};
      for (let i = 0; i < this.allImages.length; i++) {
        const img = this.allImages[i];
        let imgPref = img.name.split("-")[0];
        if (Object.keys(ClassifyImages).includes(imgPref)) {
          classImages[imgPref] = [];
          classImages[imgPref].push(img);
        }
      }
      this.classifyList = classImages;
    },
    tabClick() {
      this.page = 1;
      this.getPageImage();
    },
    deleImg(img) {
      Message.confirm("删除该图片可能导致显示问题，确定该图片已经没有用了么？")
        .then(() => {
          Http.post("deleImage", { fileName: img.name }).then(() => {
            this.getPageImage();
          });
        })
        .catch(() => {});
    },
    viewImg(img) {
      this.curImg = img;
      this.isViewImg = true;
    },
    closeView() {
      this.curImg = null;
      this.isViewImg = false;
    },
    selectImage(img) {
      if (!this.limit) return;
      if (this.selectList.includes(img.name)) {
        let index = this.selectList.indexOf(img.name);
        this.selectList.splice(index, 1);
      } else {
        if (this.selectList.length >= this.limit) {
          Message.warning(`最多选择${this.limit}张图片！`);
          return;
        } else {
          this.selectList.push(img.name);
        }
      }
      this.$emit("confirm", this.selectList);
    },
    isSelect(img) {
      return this.selectList.includes(img.name);
    },
    handleSizeChange(val) {
      this.size = val;
      Cache.set("image_list_page", val);
      this.size * this.page > this.allCount && (this.page = 1);
      this.getPageImage();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getPageImage();
    },
    copyAddress(src) {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", src);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
      }
      document.body.removeChild(input);
      Message.success("图片地址复制成功！");
    }
  }
};
</script>

<style lang="scss">
.select {
  padding: 20px;
  .img-wrap {
    width: 128px;
    height: 110px;
    margin: 6px;
    cursor: pointer;
    .cover {
      display: none;
    }
  }
}
.classify-titile {
  padding: 4px 14px;
  margin: 0 6px 10px;
  background-color: #fff;
  letter-spacing: 6px;
  border-left: 3px solid #585858;
  font-size: 14px;
  color: #6e6e6e;
}
.img-wrap {
  display: inline-block;
  width: 155px;
  height: 150px;
  margin: 8px;
  border: 1px solid #ccc;
  padding: 4px;
  text-align: center;
  vertical-align: top;
  position: relative;
  &:hover {
    .cover {
      display: block;
    }
  }
  &.checked {
    border-color: #ff4050;
    box-shadow: 0 0 1px 1px #ffb8be;
    .checkbox {
      background-color: #ff4050;
      border-color: #ff4050;
      .el-icon-check {
        display: inline-block;
      }
    }
  }

  .image {
    max-width: 100%;
    max-height: 100%;
  }
  .cover {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    .btn {
      margin-top: 70px;
    }
  }

  .checkbox {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 14px;
    height: 14px;
    background-color: #fff;
    border: 1px solid #dcdfe6;

    .el-icon-check {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
      font-size: 12px;
    }
  }
}
.footer {
  padding: 30px 0;
  .btn-wrap {
    float: right;
    padding-right: 20px;
  }
}
.view-img {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 80%;
    max-height: 80%;
  }
  .el-icon-close {
    font-size: 28px;
    position: absolute;
    cursor: pointer;
    color: #fff;
    z-index: 100;
    top: 5%;
    right: 6%;
  }
  .info-wrap {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    color: #fff;
    padding: 6px;
    border: 1px solid rgb(207, 207, 207);
    .info {
      margin: 0 10px;
    }
  }
}
</style>
