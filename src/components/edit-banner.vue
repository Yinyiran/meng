<template>
  <div class="banner">
    <i class="el-icon-close" @click="close"></i>
    <el-form label-width="80px" size="small" class="form-wrap">
      <el-form-item label="跳转类型">
        <el-select v-model="type" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="type===1" label="选择商品">
        <el-select v-model="prodID" filterable clearable placeholder="请输入关键词">
          <el-option v-for="item in prodList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="type===2" label="选择文章">
        <el-select v-model="articleID" filterable clearable placeholder="请输入关键词">
          <el-option v-for="item in articleList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="type===3" label="外部链接">
        <el-input size="small" v-model="curData.url" type="text"></el-input>
      </el-form-item>
      <el-form-item label="图片排序">
        <el-select v-model="sortNum" filterable clearable placeholder="请输入关键词">
          <el-option v-for="item in sortList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片描述">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="curData.description">
        </el-input>
      </el-form-item>
      <el-form-item label="图片修改" class="textarea">
        <upload-img :imgStr="curData.img" @images="receievImgs" :limit="1" type="banner" :maxSize="1" size="1920*1000"></upload-img>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="info" @click="close" size="small">取消</el-button>
      <el-button type="primary" @click="save" size="small">保存</el-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Form,
  FormItem,
  Tooltip,
  Button,
  Input,
  Select,
  Option
} from "element-ui";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tooltip);
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
import uploadImg from "./upload-img";
import { BannerType, Http, Message, Cache } from "../service";
export default {
  props: {
    curData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      sortNum: null,
      articleName: "",
      prodID: null,
      articleID: null,
      type: null,
      options: [],
      images: "",
      prodList: [],
      articleList: [],
      sortList: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 }
      ]
    };
  },

  created() {
    if (this.curData.type) {
      this.type = this.curData.type;
      this.sortNum = this.curData.sort;
      this.images = this.curData.img;
    } else {
      // 创建
      this.type = 1;
      this.sortNum = 1;
    }
    this.prodList = Cache.get("edit_select_prodList");
    this.articleList = Cache.get("edit_select_articleList");

    if (this.type === 1 && this.curData.prodid) {
      this.prodID = Number(this.curData.prodid);
    }
    if (this.type === 2) {
      this.articleID = Number(this.curData.articleid);
    }
    // 序列化 类型选项
    for (const key in BannerType) {
      if (BannerType.hasOwnProperty(key)) {
        const type = BannerType[key];
        this.options.push({ label: type, value: Number(key) });
      }
    }
  },
  methods: {
    save() {
      let postData = {
        type: this.type,
        sort: this.sortNum,
        url: this.curData.url || "",
        description: this.curData.description || "",
        id: this.curData.id || 0,
        prodid: this.prodID || null,
        articleid: this.articleID || null,
        img: this.images
      };
      if (!postData.img) {
        Message.error("请添加图片");
        return;
      }
      Http.post("saveBanner", postData).then(() => {
        Message.success("保存成功");
        this.$emit("reload", "banner");
        this.close();
      });
    },
    close() {
      this.$emit("close");
    },
    receievImgs(images) {
      this.images = images.toString();
    }
  },
  components: {
    uploadImg
  }
};
</script>

<style lang="scss">
.banner {
  position: relative;
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;
  .btns {
    text-align: center;
    button {
      margin: 0 20px;
    }
  }
  .el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
