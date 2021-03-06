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
        <i class="el-icon-picture-outline upload-icon" title="选择已经上传过的图片" @click="showImgDialog"></i>
      </div>
    </img-item>
    <el-dialog title="选择已经上传过的图片" :visible.sync="showImgs" :append-to-body="true">
      <div class="img-list">
        <img
          class="img"
          v-for="(item,index) in allImgs"
          :key="index"
          :class="{select:item.selected}"
          :src="item.src"
          @click="selectImg(item)"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ImgItem from "../components/ImgItem";
  import { UploadAccept, Data, UtilService } from "../service";

  export default {
    props: {
      multi: {
        type: Boolean,
        default: true,
      },
      imgs: [Array, String],
      limitSize: {
        type: Number,
        default: 5120,
      },
      limit: {
        type: String,
        default: "20",
      },
      accept: {
        type: String,
        default: "img",
      },
    },
    components: { ImgItem },
    data() {
      return {
        showPreview: false,
        curUrl: "",
        localfiles: [],
        showImgs: false,
        imgList: [],
        allImgs: null,
        acceptType: UploadAccept[this.accept] || "",
      };
    },
    watch: {
      imgs: {
        handler(val) {
          this.getImgs(val);
        },
        immediate: true,
      },
    },
    methods: {
      getImgs(val) {
        this.localfiles = [];
        switch (UtilService.TypeOf(val)) {
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
            this.$message.error("图片展示组件传入的格式不正确", val);
        }
      },
      showImgDialog() {
        this.showImgs = true;
        if (!this.allImgs) {
          UtilService.GetImgs().then((res) => {
            this.allImgs = res.map((item) => {
              return { src: item, selected: this.imgList.includes(item) };
            });
          });
        } else {
          this.allImgs.forEach((item) => {
            item.selected = this.imgList.includes(item.src);
          });
        }
      },
      selectImg(item) {
        let index = this.imgList.indexOf(item.src);
        if (index > -1) {
          item.selected = false;
          this.imgList.splice(index, 1);
        } else {
          if (this.limit > this.imgList.length) {
            this.imgList.push(item.src);
            item.selected = true;
          } else {
            this.$message.warning(`最多上传${this.limit}张图片`);
          }
        }
      },
      async upload() {
        if (this.localfiles.length === 0) return this.imgList;
        await UtilService.getFileHash(this.localfiles);
        let hashs = this.localfiles.map((item) => item.filehash);
        let { data } = await Data.post("/fileExist", hashs);
        let formData = new FormData();
        let upFile = [];
        this.localfiles.forEach((item, index) => {
          let existpath = data[item.filehash];
          if (existpath) {
            let index = this.imgList.indexOf(item.url);
            if (index > -1) {
              this.imgList.splice(index, 1, existpath);
            } else {
              this.imgList.push(existpath);
            }
          } else {
            formData.append(`file_${index}`, item.file);
            formData.append(`file_${index}`, `${item.filehash}`);
            upFile.push(item);
          }
        });
        let uplen = upFile.length;
        if (uplen) {
          let res = await UtilService.UpLoadFile(formData);
          this.imgList = this.imgList.filter((url) => !url.startsWith("blob:"));
          this.imgList.push(...res.data);
        }
        return this.imgList;
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
            [].some.call(files, (v) => Math.round(v.size / 1024) > this.limitSize)
          ) {
            this.$message.warning("图片大小最大支持2M");
          } else {
            files.forEach((file, index) => {
              let url = URL.createObjectURL(file);
              const isExist = this.imgList.find((item) => item === url);
              if (!isExist) {
                this.localfiles.push({ file, filehash: "", url });
                this.imgList.push(url);
              }
            });
          }
        } else {
          this.$message.warning(`图片超过最大数量（${this.limit}个）`);
        }
      },
      removeImg(src) {
        let index = this.imgList.indexOf(src);
        this.imgList.splice(index, 1);
        this.removeUpFile(src); // 删除缓存的图片
      },
      removeUpFile(src) {
        let upindex = this.localfiles.findIndex((item) => (item.url = src));
        if (upindex > -1) this.localfiles.splice(-1);
        this.$refs.uploadRef.value = "";
      },
    },
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
    width: 80px;
    height: 60px;
    transition: 0.2s;
    &:hover {
      border-color: #409eff;
    }
    .upload-input {
      position: absolute;
      left: 68%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 28px;
      height: 28px;
      opacity: 0;
      cursor: pointer;
      font-size: 0; // cursor: pointer 起作用
      z-index: 10;
      &:hover {
        color: #409eff;
        + .el-icon-plus {
          color: #409eff;
        }
      }
    }
    .el-icon-picture-outline {
      left: 34%;
    }
    .el-icon-plus {
      left: 68%;
    }
  }

  .upload-icon {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    font-size: 20px;
    color: #c0ccda;
    padding: 4px;
    z-index: 0;
    &:hover {
      color: #409eff;
    }
  }
  .img-list {
    height: 300px;
    .img {
      width: 60px;
      height: 60px;
      margin: 0 4px;
      border: 1px solid #e8e8e8;
      object-fit: cover;
      cursor: pointer;
      &.select {
        border: 1px solid red;
        position: relative;
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          content: "";
          width: 10px;
          height: 10px;
          background-color: red;
          transform: rotate(-45deg);
        }
      }
    }
  }
  .dialog-footer {
    padding-right: 20px;
    text-align: right;
  }
</style>