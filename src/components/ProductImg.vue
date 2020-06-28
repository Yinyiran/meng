<template>
  <div class="product-img">
    <div class="carousel-item">
      <el-carousel ref="carousel" @change="carChange" indicator-position="none" :autoplay="false">
        <el-carousel-item v-for="img in prod.ProdImg" :key="img">
          <img width="100%" :src="img" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="img-wrap" @click.stop>
      <img
        class="img-mini"
        :style="{width:size,height:size}"
        v-for="(item,mindex) in prod.Products"
        :key="mindex"
        :src="item.ProdImg"
        :class="{active:prod.current === mindex}"
        @click="miniChange(mindex)"
      />
    </div>
    <div class="prod-intro" v-if="info">{{prod.Intro}}</div>
    <!-- <template v-else>
      <div class="prod-item">
        <img class="prod-img" :src="prod.ProdImg" />
      </div>
      <div class="prod-intro" v-if="info">{{prod.ProdName}}</div>
    </template>-->
  </div>
</template>

<script>
  export default {
    props: {
      prod: Object,
      info: Boolean,
      size: String
    },
    data() {
      return {
        Classify: 1001,
        ProdContent: "<p>啊发违法为傲文法文</p>",
        ProdID: 10009,
        ProdImg:
          "resource/img/2020-06-23/1592881861988.jpg,resource/img/2020-06-23/1592881893637.png",
        ProdIntro: "傲文法",
        ProdName: "爱蜂窝",
        ProdStar: 1,
        Property: `{"wef":"wef傲文法"}`
      };
    },
    methods: {
      carChange(index) {
        this.prod.current = index;
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