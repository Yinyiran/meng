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
  import { UploadAccept, Data } from "../service";
  import { UpLoadFile, TypeOf } from "../service/util";
  import { MD5 } from "crypto-js";

  export default {
    props: {
      multi: {
        type: Boolean,
        default: true
      },
      imgs: [Array, String],
      limitSize: {
        type: Number,
        default: 5120
      },
      limit: {
        type: String,
        default: "20"
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
        localfiles: [],
        imgList: [],
        acceptType: UploadAccept[this.accept] || ""
      };
    },
    watch: {
      imgs: {
        handler(val) {
          this.getImgs(val);
        },
        immediate: true
      }
    },
    methods: {
      getImgs(val) {
        this.localfiles = [];
        switch (TypeOf(val)) {
          case "undefined":
            this.imgList = [];
            break;
          case "string":
            this.imgList = val ? [val] : [];
            break;
          case "array":
            this.imgList = [].concat(val);
            break;
          default:
            console.error("图片展示组件传入的格式不正确", val);
        }
      },
      async upload() {
        if (this.localfiles.length === 0) return this.imgList;
        await this.getFileHash();
        let hashs = this.localfiles.map(item => item.filehash);
        let { data } = await Data.post("/fileExist", hashs);
        let formData = new FormData();
        let upFile = [];
        this.localfiles.forEach((item, index) => {
          let existpath = data[item.filehash];
          if (existpath) {
            let index = this.imgList.indexOf(item.url);
            this.imgList.splice(index, 1, existpath);
          } else {
            formData.append(`file_${index}`, item.file);
            formData.append(`file_${index}`, `${item.filehash}`);
            upFile.push(item);
          }
        });
        let uplen = upFile.length;
        if (uplen) {
          let res = await UpLoadFile(formData);
          this.imgList = this.imgList.filter(url => !url.startsWith("blob:"));
          this.imgList.push(...res.data);
        }
        return this.imgList;
      },

      async getFileHash() {
        let promisArr = [].map.call(this.localfiles, item => {
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
        if (files.length === 0) {
          this.$refs.uploadRef.value = "";
          return;
        }
        let imgLen = this.imgList.length + files.length;
        if (imgLen <= this.limit) {
          if (
            [].some.call(files, v => Math.round(v.size / 1024) > this.limitSize)
          ) {
            Message.warning("图片大小最大支持2M");
          } else {
            files.forEach((file, index) => {
              let url = URL.createObjectURL(file);
              const isExist = this.imgList.find(item => item === url);
              if (!isExist) {
                this.localfiles.push({ file, filehash: "", url });
                this.imgList.push(url);
              }
            });
          }
        } else {
          Message.warning(`图片超过最大数量（${this.limit}个）`);
        }
      },
      removeImg(src) {
        let index = this.imgList.indexOf(src);
        this.imgList.splice(index, 1);
        this.removeUpFile(src); // 删除缓存的图片
      },
      removeUpFile(src) {
        let upindex = this.localfiles.findIndex(item => (item.url = src));
        if (upindex > -1) this.localfiles.splice(-1);
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