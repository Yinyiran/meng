<template>
  <div class="img-crop">
    <span class="el-icon-circle-close close-btn" @click="$emit('close')"></span>
    <div class="cropper" :style="{'height':height,'width':width}">
      <vue-cropper ref="cropper" :autoCropWidth="autoCropWidth" :autoCropHeight="autoCropHeight" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :fixedBox="option.fixedBox" :autoCrop="true" :original="option.original" @realTime="realTime"></vue-cropper>
    </div>
    <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
      <div :style="previews.div">
        <img :src="previews.url">
      </div>
    </div>
    <div class="radius-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
      <div :style="previews.div">
        <img :src="previews.url">
      </div>
    </div>
    <div class="test-button">
      <label class="btn" for="uploads">选择图片</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
      <button @click="rotateLeft" class="btn">左转</button>
      <button @click="rotateRight" class="btn">右转</button>
      <el-button class="btn save-btn" v-if="previews.url" @click="saveImg" size="mini">上传</el-button>
      <div v-if="previews.url">
        <!-- 下载的图片格式 -->
        <el-select v-model="defaultType" placeholder="请选择" class="down-Pic-Type" size="mini">
          <el-option v-for="item in outputTypes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <a @click="down('base64')" class="btn">下载</a>
      </div>
    </div>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
import { Http, Message, API } from "../service";
export default {
  data: function() {
    return {
      model: false,
      modelSrc: "",
      height: "140px",
      width: "140px",
      autoCropWidth: 70,
      autoCropHeight: 70,
      previews: {
        img: `${API.imgSrc}avatar.png`
      },
      option: {
        img: `${API.imgSrc}/avatar.png`,
        size: 1,
        full: true,
        outputTypes: "png",
        canMove: true, //能否拖动图片
        fixedBox: false, //截图框固定大小
        original: true, //上传图片是否显示原始宽高 (针对大图 可以铺满)
        canMoveBox: true // 截图框能否拖动
      },
      defaultType: "jpeg",
      outputTypes: [
        {
          value: "jpeg",
          label: "下载jpeg格式"
        },
        {
          value: "png",
          label: "下载png格式"
        },
        {
          value: "webp",
          label: "下载webp格式"
        }
      ],
      downImg: "#"
    };
  },
  methods: {
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    finish(type) {
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    down(type) {
      // event.preventDefault()
      var aLink = document.createElement("a");
      aLink.download = "demo";
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data;
          aLink.href = data;
          aLink.click();
        });
      }
    },

    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    saveImg() {
      this.$refs.cropper.getCropData(data => {
        Http.post("saveLogo", { img: data }).then(() => {
          Message.success("保存成功!");
          this.$emit("close");
        });
      });
    }
  },
  components: {
    VueCropper
  }
};
</script>

<style lang="scss" scoped>
.img-crop {
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 460px;
  height: 240px;
  background-color: #fff;
  transform: translate(-50%, -50%);
  .close-btn {
    position: absolute;
    top: -30px;
    right: -30px;
    color: #bbb;
    font-size: 30px;
    cursor: pointer;
  }
  .show-preview,
  .cropper {
    display: inline-block;
  }
  .radius-preview {
    display: inline-block;
    border-radius: 50%;
  }
  .show-preview,
  .radius-preview {
    margin-left: 50px !important;
    background-color: #fff;
  }
  .test-button {
    display: flex;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 20px 10px 0px 0px;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all 0.2s ease;
    text-decoration: none;
    user-select: none;
  }
  .save-btn {
    margin-left: 50px;
  }
  .down-Pic-Type {
    margin: 20px 10px 0px 0px;
    width: 134px;
  }
}
</style>
