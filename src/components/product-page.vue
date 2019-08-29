<template>
  <div class="product">
    <div class="clearfix">
      <carousel class="slider" :images="images"></carousel>
      <div class="product-info">
        <h2 class="prod-name">{{product.name}}</h2>
        <p class="prod-name">型号：{{product.sku}}</p>
        <p class="prod-name">简介：{{product.intro}}</p>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="产品介绍" name="product">
        <div v-html="product.details"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Vue from "vue";
import { Tabs, TabPane } from "element-ui";
Vue.use(Tabs);
Vue.use(TabPane);
import Carousel from "./carousel.vue";
import { Http, Query } from "../service";
export default {
  data() {
    return {
      activeName: "product",
      showInfo: true,
      product: {},
      images: []
    };
  },
  activated() {
    let productID = Query("id");
    this.activeName = "product";
    Http.get(`web/getProduct?id=${productID}`).then(res => {
      this.product = res.data;
      this.splitImage(res.data);
    });
  },
  deactivated() {
    this.product = {};
    this.images = [];
  },
  methods: {
    handleClick() {},
    splitImage(data) {
      let list = [];
      let imgArr = data.images.split(",");
      if (imgArr) {
        for (const img of imgArr) {
          let obj = {
            id: data.id + Math.round(),
            img: img
          };
          list.push(obj);
        }
        this.images = list;
      } else {
        this.images = [];
      }
    }
  },
  components: {
    Carousel
  }
};
</script>

<style lang="scss">
@import "../assets/css/variable.scss";
.product {
  margin: auto;
  padding: 20px 0;
  width: 1000px;
}

.slider {
  float: left;
  width: 43%;
  overflow: hidden;
}
.evaluate-wrap {
  .evaluate-item {
    padding: 10px 20px;
    background-color: #fff;
    margin-bottom: 10px;
  }
  .item-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
  }
  .item-intro {
    margin-left: 70px;
    height: 50px;
    font-size: 14px;
    color: #999;

    .intro {
      line-height: 30px;
      color: #222;
    }
  }
}

.product-info {
  margin-left: 45%;
  height: 220px;
}
</style>
