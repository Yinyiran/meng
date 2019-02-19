<template>
  <div class="upload-img">
    <div class="upload-img-tip">{ {{fileTypeTip}}，{{fileLimitTip}}，{{fileSizeTip}}。
      <el-button size="mini" type="success" @click="isShowImages = true">选择图片</el-button>
    </div>
    <el-upload :http-request="http_request" :file-list="fileList" :limit="limit" :auto-upload="false" :on-exceed="overMax" :on-preview="preview" :on-change="on_change" :before-remove="before_remove" class="upload" action="" list-type="picture-card" ref="upload" :on-success="onSuccess" :on-error="onError" :accept="imgType" :show-file-list="true">
      <!-- 点击上传 -->
      <el-tooltip class="item" effect="dark" :enterable="false" content="上传图片" placement="top">
        <i class="el-icon-plus"></i>
      </el-tooltip>
    </el-upload>
    <div class="view-img" v-show="isShowPicPreview" @click="isShowPicPreview = false">
      <i class="el-icon-close"></i>
      <img class="img" :src="picPreviewUrl" alt="" @click.stop>
    </div>
    <div class="images-wrap" v-if="isShowImages" @click="isShowImages = false">
      <span class="close el-icon-close" @click="isShowEvaluate = false"></span>
      <image-list class="image-list" :selectList="selectList" :limit="limit" @confirm="formateImages"></image-list>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Upload, tooltip, Button } from "element-ui";
Vue.use(Upload);
Vue.use(tooltip);
Vue.use(Button);
import { API, Message, Http } from "../service";
import imageList from "./image-list.vue";
export default {
  props: {
    size: {
      type: String,
      default: "300*300"
    },
    limit: {
      type: Number,
      default: 5
    },
    maxSize: {
      type: Number,
      default: 0.05
    },
    type: {
      type: String,
      default: ""
    },
    imgStr: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      fileList: [],
      selectList: [],
      isShowImages: false,
      isShowPicPreview: false,
      picPreviewUrl: "",
      imgType: "image/gif, image/jpeg, image/png"
    };
  },
  created() {
    this.formateImages(this.imgStr);
  },
  methods: {
    formateImages(imgs) {
      let imgList = [];
      if (imgs.length > 0) {
        let imgArr;
        if (Array.isArray(imgs)) {
          imgArr = imgs;
        } else {
          imgArr = imgs.split(",");
          this.selectList = imgArr;
        }
        for (const img of imgArr) {
          let imgObj = {
            name: img,
            url: API.imgSrc + img
          };
          imgList.push(imgObj);
        }
      }
      this.fileList = imgList;
      if (Array.isArray(imgs)) {
        this.emitImage(imgList);
        // this.isShowImages = false; // 选择图片之后关闭
      }
    },
    emitImage(fileList) {
      let images = [];
      for (const key in fileList) {
        if (fileList.hasOwnProperty(key)) {
          if (!fileList[key].name) {
            // debugger;
          }
          images.push(fileList[key].name);
        }
      }
      this.selectList = images;
      this.$emit("images", images.toString());
      this.$emit("update:imgStr", images.toString());
    },
    /**
     * 覆盖默认的上传行为，可以自定义上传的实现
     */
    http_request(req) {
      let formData = new FormData();
      formData.append("file", req.file);
      Http.post(`uploadImg?type=${this.type}`, formData)
        .then(res => {
          req.onSuccess(res.data);
        })
        .catch(err => {
          req.onError(err);
        });
    },
    uploadbtn() {
      this.$refs.upload.submit();
    },
    /**
     * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
     */
    on_change(file, fileList) {
      if (file.status == "ready") {
        this.$refs.upload.submit(); // 出发上传
        // this.fileList.push(file);
        if (this.imgType.indexOf(file.type) > -1) {
          Message.error(this.fileTypeTip);
          fileList.pop();
          return;
        }
        if (file.size / 1024 / 1024 > this.maxSize) {
          Message.error(this.fileSizeTip);
          fileList.pop();
          return;
        }
      }
      if (file.status == "fail") {
        file.status = "ready";
        fileList.push(file);
      }
    },
    onError(err) {
      Message.error(JSON.stringify(err));
    },
    onSuccess(response, file, fileList) {
      fileList[fileList.indexOf(file)].name = response.name;
      this.emitImage(fileList);
    },
    /**
     * 删除文件之前的钩子
     */
    before_remove(file, fileList) {
      // this.fileList.splice(this.fileList.indexOf(file), 1);
      fileList.splice(fileList.indexOf(file), 1);
      this.emitImage(fileList);
    },
    /**
     * 文件超出个数限制时的钩子
     */
    upload_exceed() {
      Message.error(this.fileLimitTip);
    },
    // 图片预览
    preview(file) {
      this.picPreviewUrl = file.url;
      this.isShowPicPreview = true;
    },
    // 图片上传数量限制
    overMax() {
      Message.error(this.fileLimitTip);
    }
  },
  computed: {
    fileTypeTip() {
      return `只能上传${this.fileAccept}格式文件`;
    },
    fileLimitTip() {
      return `最多上传${this.limit}个文件`;
    },
    fileSizeTip() {
      return `文件不能大于${this.maxSize}M`;
    }
  },
  components: {
    imageList
  },
  watch: {
    imgStr(newVal) {
      this.formateImages(newVal);
    }
  }
};
</script>
<style lang="scss">
.upload-img {
  .upload-img-tip {
    color: #999;
    font-size: 12px;
    height: 50px;
  }
  .el-dialog {
    width: 80%;
    height: 80%;
  }
  .prew-img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .images-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    overflow: auto;
    z-index: 1;
    .close {
      position: absolute;
      top: 30px;
      right: 30px;
      font-size: 22px;
      color: #fff;
      cursor: pointer;
    }
    .image-list {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: auto;
      width: 80%;
      height: 80%;
      background-color: #fff;
      padding-bottom: 20px;
      box-sizing: border-box;
    }
  }
  .view-img {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    .img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 90%;
      max-height: 90%;
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
  }
}
</style>
