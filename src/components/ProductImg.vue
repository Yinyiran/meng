<template>
  <div class="product-img">
    <template v-if="imgData.imgs.length>1">
      <div class="carousel-item">
        <el-carousel ref="carousel" @change="carChange" indicator-position="none" :autoplay="false">
          <el-carousel-item v-for="(img,index) in imgData.imgs" :key="index">
            <img width="100%" :src="img" alt />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="img-wrap" @click.stop>
        <img
          class="img-mini"
          :style="{width:size,height:size}"
          v-for="(src,index) in imgData.imgs"
          :key="index"
          :src="src"
          :class="{active:imgData.curIndex === index}"
          @click="miniChange(index)"
        />
      </div>
      <div class="prod-intro" v-if="info">{{imgData.title}}</div>
    </template>
    <template v-else>
      <div class="prod-item">
        <img class="prod-img" :src="imgData.imgs" />
      </div>
      <div class="prod-intro" v-if="info">{{imgData.title}}</div>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      imgData: Object,
      info: Boolean,
      size: String
    },
    watch: {
      imgData(val) {
        this.$nextTick(() => {
          if (this.$refs.carousel) this.$refs.carousel.setActiveItem(0);
        });
      }
    },
    methods: {
      carChange(index) {
        this.imgData.curIndex = index;
      },
      miniChange(imgIndex) {
        this.$refs.carousel.setActiveItem(imgIndex);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../assets/style/color.less";

  .product-img {
    text-align: center;
    margin-top: 15px;
    width: 100%;
  }

  .carousel-item {
    cursor: pointer;
    padding-bottom: 100%;
    height: 0;
    position: relative;
  }
  .img-wrap {
    margin-top: 15px;
  }
  .img-mini {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 1px solid #e8e8e8;
    margin: 0 2px;
    cursor: pointer;
    &.active {
      border: 1px solid @active;
    }
  }

  .prod-intro {
    text-align: center;
    cursor: pointer;
    padding: 10px 0 20px;
  }
  .prod-item {
    cursor: pointer;
    padding-bottom: 100%;
    height: 0;
    position: relative;
  }
  .prod-img {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
  }
</style>