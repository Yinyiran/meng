<template>
  <div class="upload-file">
    <div class="thumb-wrap" v-for="(src,index) in urls" :key="index">
      <img class="thumb-img" :src="src" />
      <div class="thumb-btn">
        <i class="el-icon-circle-plus-outline" title="大图预览" @click="previewImg(src)"></i>
        <i class="el-icon-delete" title="删除图片" @click="deleImg(index)"></i>
      </div>
    </div>
    <div class="input-wrap">
      <input
        class="upload-input"
        type="file"
        id="upload-img"
        :accept="acceptType"
        title="点击上传文件"
        :multiple="multi"
        @change="fileCheck"
      />
      <i class="el-icon-plus upload-icon"></i>
    </div>
    <el-dialog :visible.sync="showPreview" width="60%" :append-to-body="true">
      <div class="preview-wrap">
        <img class="preview-img" :src="curUrl" alt />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { UploadAccept } from "../service/enum";
import { Message } from "element-ui";

export default {
  props: {
    sigle: Boolean,
    multi: Boolean,
    limitSize: {
      type: Number,
      default: 2048
    },
    limitNum: {
      type: Number,
      default: 20
    },
    accept: {
      type: String,
      default: "img"
    }
  },
  data() {
    return {
      showPreview: false,
      curUrl: "",
      acceptType: UploadAccept[this.accept],
      dialogVisible: false,
      imageUrl: "",
      dialogImageUrl: "",
      urls: []
    };
  },
  methods: {
    previewImg(src) {
      this.showPreview = true;
      this.curUrl = src;
    },
    deleImg(index) {
      this.urls.splice(index, 1);
      // let file = document.getElementById("upload-img");
      // file.outerHTML = file.outerHTML;
    },
    fileCheck(isSelect) {
      if (!isSelect) return;
      let files = event.target.files;
      if (this.limitNum > this.urls.length) {
        if (
          [].some.call(files, v => Math.round(v.size / 1024) > this.limitSize)
        ) {
          Message.warning("图片大小最大支持2M");
        } else {
          files.forEach(file => {
            let url = URL.createObjectURL(file);
            const isExist = this.urls.find(item => item === url);
            if (!isExist) {
              const formData = new FormData();
              formData.append("file", file);
              this.urls.push(url);
            }
          });
        }
      } else {
        Message.warning(`图片超过最大数量（${this.limitNum}个）`);
      }
    }
  }
};
</script>

<style lang="less">
.thumb-wrap {
  vertical-align: top;
  margin-right: 5px;
  margin-bottom: 5px;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  &:hover {
    .thumb-btn {
      opacity: 1;
    }
  }
  .thumb-img {
    vertical-align: top;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  .thumb-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.2s;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 20px;
    i {
      margin: 0 5px;
    }
  }
}
.input-wrap {
  vertical-align: top;
  display: inline-block;
  width: 100px;
  height: 100px;
  position: relative;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  transition: 0.2s;
  &:hover {
    border-color: #409eff;
    .upload-icon {
      color: #409eff;
    }
  }
  .upload-input {
    vertical-align: top;
    height: 100%;
    width: 100%;
    opacity: 0;
    z-index: 10;
    cursor: pointer;
  }
}
.upload-icon {
  font-size: 20px;
  color: #c0ccda;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, -50%);
}
.preview-wrap {
  text-align: center;
  .preview-img {
    max-width: 100%;
    border: 1px solid #e8e8e8;
  }
}
</style>