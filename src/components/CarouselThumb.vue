<template>
  <div class="carousel">
    <div class="carousel-item">
      <el-carousel ref="carousel" @change="carChange" indicator-position="none" :autoplay="false">
        <el-carousel-item v-for="item in product.Products" :key="item.ProdImg">
          <img width="100%" :src="item.ProdImg" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="img-wrap" @click.stop>
      <img
        class="img-mini"
        v-for="(item,mindex) in product.Products"
        :key="mindex"
        :src="item.ProdImg"
        :class="{active:product.current === mindex}"
        @click="miniChange(mindex)"
      />
    </div>
  </div>
</template>

<script>
import "../element/Carousel";
export default {
  props: {
    product: Object
  },
  methods: {
    carChange(index) {
      this.product.current = index;
    },
    miniChange(imgIndex) {
      this.$refs.carousel.setActiveItem(imgIndex);
    }
  }
};
</script>

<style lang="less">
@import "../assets/style/color.less";
.carousel {
  .carousel-item {
    cursor: pointer;
    padding-bottom: 100%;
    height: 0;
    position: relative;
  }
  .img-wrap {
    height: 30px;
    line-height: 30px;
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
}
</style>