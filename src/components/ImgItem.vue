<template>
  <div class="img-item">
    <div class="thumb-wrap" v-for="(item,index) in imgs" :key="index">
      <img class="thumb-img" :src="item" />
      <div class="thumb-btn">
        <i class="el-icon-view" title="大图预览" @click="previewImg(item)"></i>
        <i class="el-icon-delete" title="删除图片" @click="removeImg(item)"></i>
      </div>
    </div>
    <slot></slot>
    <el-dialog :visible.sync="showPreview" width="80%" top="1vh" :append-to-body="true">
      <div class="preview-wrap">
        <img class="preview-img" :src="curUrl" alt />
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      imgs: Array,
    },
    data() {
      return {
        showPreview: false,
        curUrl: "",
      };
    },
    methods: {
      previewImg(src) {
        this.showPreview = true;
        this.curUrl = src;
      },
      removeImg(src) {
        this.$emit("removeImg", src);
      },
    },
  };
</script>

<style lang="less">
  .img-item {
    display: inline-block;
    position: relative;
  }
  .thumb-wrap {
    vertical-align: top;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid #c0ccda;
    position: relative;
    border-radius: 6px;
    display: inline-block;
    width: 80px;
    height: 60px;
    &:hover {
      .thumb-btn {
        opacity: 1;
      }
      .img-name {
        opacity: 1;
      }
    }
    .thumb-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
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
    .img-name {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 30px;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.1);
      line-height: 30px;
      text-align: center;
      color: #fff;
      padding: 0 10px;
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