<template>
  <div class="upload-file">
    <img-item :imgs="imgList" @removeImg="removeImg">
      <div class="input-wrap" v-show="imgList.length<limit">
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
    </img-item>
  </div>
</template>

<script>
  import ImgItem from "../components/ImgItem";
  import { Message } from "element-ui";
  import { UploadAccept, HTTP } from "../service";
  import { UpLoadFile } from "../service/util";
  import { MD5 } from "crypto-js";

  export default {
    props: {
      multi: {
        type: Boolean,
        default: true
      },
      imgs: {
        type: Array,
        default() {
          return [];
        }
      },
      limitSize: {
        type: Number,
        default: 5120
      },
      limit: {
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
        files: [],
        upImgs: [],
        acceptType: UploadAccept[this.accept]
      };
    },
    computed: {
      imgList() {
        return [].concat(this.imgs, this.upImgs);
      }
    },
    methods: {
      async upload() {
        if (this.upImgs.length === 0) return [];
        await this.getFileHash();
        let hashs = this.files.map(item => item.filehash);
        debugger;
        let existFiles = await HTTP.post("/fileExist", hashs);
        let formData = new FormData();
        this.files.forEach((item, index) => {
          let existpath = existFiles[item.filehash];
          if (existpath) {
            this.imgs.push(existpath);
          } else {
            formData.append(`file_${index}`, item.file);
            formData.append(`file_${index}`, `${item.filehash}`);
          }
        });
        let res = await UpLoadFile(formData);
        this.upImgs = [];
        return [].concat(this.imgs, res.data);
      },

      async getFileHash() {
        let promisArr = [].map.call(this.files, item => {
          return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = event => {
              var binary = event.target.result;
              item.filehash = MD5(binary).toString();
              resolve();
            };
            reader.readAsBinaryString(item.file);
          });
        });
        return Promise.all(promisArr);
      },

      async fileCheck() {
        let files = event.target.files;
        if (files.length === 0) return;
        if (this.limit > this.imgList.length) {
          if (
            [].some.call(files, v => Math.round(v.size / 1024) > this.limitSize)
          ) {
            Message.warning("图片大小最大支持2M");
          } else {
            files.forEach((file, index) => {
              let url = URL.createObjectURL(file);
              const isExist = this.upImgs.find(item => item === url);
              if (!isExist) {
                this.files.push({ file, filehash: "" });
                this.upImgs.push(url);
              }
            });
          }
        } else {
          Message.warning(`图片超过最大数量（${this.limit}个）`);
        }
      },
      removeImg(index) {
        this.imgList.splice(index, 1);
        this.$refs.uploadRef.value = "";
      }
    }
  };
</script>

<style lang="less">
  .input-wrap {
    vertical-align: top;
    margin-right: 10px;
    margin-bottom: 10px;
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
    z-index: 0;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }
</style>