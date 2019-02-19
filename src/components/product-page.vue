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
      <el-tab-pane label="用户评价" name="evaluate">
        <div class="evaluate-wrap">
          <div v-for="(item,index) in evaluates" :key="index" class="evaluate-item">
            <img :src="item.src" class="item-avatar">
            <div class="item-intro">
              <div class="intro">{{item.intro}}</div>
              <div class="evaluate">{{item.evaluate}}</div>
            </div>
          </div>
          <no-data :length="evaluates.length"></no-data>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
import Vue from "vue";
import { Tabs, TabPane } from "element-ui";
Vue.use(Tabs);
Vue.use(TabPane);
import NoData from "./no-data";
import Carousel from "./carousel.vue";
import { Http, Query, API } from "../service";
export default {
  data() {
    return {
      activeName: "product",
      showInfo: true,
      product: {},
      evaluates: [],
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

    Http.get(`web/getEvaluate?prodID=${productID}`).then(res => {
      res.data.map(item => {
        return (item.src = API.imgSrc + item.user_avatar);
      });
      this.evaluates = res.data;
    });
  },
  deactivated() {
    this.product = {};
    this.evaluates = [];
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
    Carousel,
    NoData
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
