<template>
  <div class="img-item">
    <div class="thumb-wrap" v-for="(src,index) in imgs" :key="index">
      <img class="thumb-img" :src="src" />
      <div class="thumb-btn">
        <i class="el-icon-circle-plus-outline" title="大图预览" @click="previewImg(src)"></i>
        <i class="el-icon-delete" title="删除图片" @click="removeImg(index)"></i>
      </div>
    </div>
    <el-dialog :visible.sync="showPreview" width="80%" :append-to-body="true">
      <div class="preview-wrap">
        <img class="preview-img" :src="curUrl" alt />
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      imgs: Array
    },
    data() {
      return {
        showPreview: false,
        curUrl: ""
      };
    },
    methods: {
      previewImg(src) {
        this.showPreview = true;
        this.curUrl = src;
      },
      removeImg(index) {
        this.$emit("removeImg", index);
      }
    }
  };
</script>

<style lang="less">
  .img-item {
    display: inline-block;
  }
  .thumb-wrap {
    vertical-align: top;
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #c0ccda;
    position: relative;
    border-radius: 6px;
    display: inline-block;
    width: 100px;
    height: 100px;
    &:hover {
      .thumb-btn {
        opacity: 1;
      }
    }
    .thumb-img {
      width: 100%;
      height: 100%;
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
        cursor: pointer;
      }
    }
  }
  .preview-wrap {
    text-align: center;
    .preview-img {
      max-width: 100%;
      border: 1px solid #e8e8e8;
    }
  }
</style>