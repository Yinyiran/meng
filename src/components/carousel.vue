<template>
  <div class="el-carousel__container carousel">
    <el-carousel class="slider-wrap" trigger="click" indicator-position="inside" ref="carousel" :height="carheight">
      <el-carousel-item v-for="(item,index) in images" :key="index">
        <img class="img" :src="imgSrc(item.img)" @click="toDetail(item)" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { API } from "../service";
import Vue from "vue";
import { Carousel, CarouselItem } from "element-ui";
Vue.use(Carousel);
Vue.use(CarouselItem);
export default {
  props: {
    height: {
      type: Number,
      default: 300
    },
    type: String,
    images: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      slider: [],
      carheight: ""
    };
  },
  created() {
    let _this = this;
    if (this.type === "banner") {
      let height;
      height = Math.round(window.innerWidth * 0.4);
      // 改变高度
      window.addEventListener("resize", function() {
        height = Math.round(window.innerWidth * 0.4);
        _this.$nextTick(() => {
          _this.$refs.carousel.$el.childNodes[0].style.height = height + "px";
        });
      });
      this.carheight = height + "px";
    } else {
      this.carheight = this.height + "px";
    }
  },

  methods: {
    imgSrc(url) {
      let src = API.imgSrc + url;
      return src;
    },
    toDetail(item) {
      if (this.type !== "banner") return;
      switch (item.type) {
        case 1: // 产品
          this.$router.push(`/products/page?id=${item.prodid}`);
          break;
        case 2: // 文章
          this.$router.push(`/articles/page?id=${item.articleid}`);
          break;
        case 3:
          window.location.href = item.url;
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.el-carousel__item {
  cursor: pointer;
  .img {
    width: 100%;
  }
}
.el-carousel__container.carousel {
  height: auto;
}
</style>
