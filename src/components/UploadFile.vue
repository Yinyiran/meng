<template>
  <div class="upload-file">
    <img-item :imgs="urls" @removeImg="removeImg"></img-item>
    <div class="input-wrap">
      <input
        class="upload-input"
        type="file"
        ref="uploadRef"
        :accept="acceptType"
        title="点击上传文件"
        :multiple="multi"
        @change="fileCheck()"
      />
      <i class="el-icon-plus upload-icon"></i>
    </div>
  </div>
</template>

<script>
  import ImgItem from "../components/ImgItem";
  import { Message } from "element-ui";
  import { UploadAccept, HTTP } from "../service";

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
    components: { ImgItem },
    data() {
      return {
        showPreview: false,
        curUrl: "",
        acceptType: UploadAccept[this.accept],
        formData: new FormData(),
        urls: []
      };
    },
    methods: {
      removeImg(index) {
        this.urls.splice(index, 1);
        this.$refs.uploadRef.value = "";
      },
      async upload() {
        if (this.urls.length === 0) return;
        this.formData.append("type", "img");
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: progressEvent => {
            var complete =
              (((progressEvent.loaded / progressEvent.total) * 100) | 0) + "%";
            console.log(complete);
          }
        };
        let res = await HTTP.post("/uploadFile", this.formData, config);
        console.log(res);
      },
      fileCheck() {
        let files = event.target.files;
        if (files.length === 0) return;
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
                this.formData.append("file", file);
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
  .input-wrap {
    vertical-align: top;
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #c0ccda;
    position: relative;
    border-radius: 6px;
    display: inline-block;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }
  .input-wrap {
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
</style>