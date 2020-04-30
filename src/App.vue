<template>
  <div id="app">
    <el-carousel indicator-position="none">
      <el-carousel-item v-for="item in sliders" :key="item.img">
        <img :src="item.img" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="products">
      <div class="prod-wrap" v-for="(prod,index) in products" :key="index">
        <div class="prod-item">
          <template v-if="prod.Products">
            <el-carousel height="100%" indicator-position="none" :autoplay="false">
              <el-carousel-item v-for="item in prod.Products" :key="item.ProdImg">
                <img width="100%" :src="item.ProdImg" alt />
              </el-carousel-item>
            </el-carousel>
            <div class="img-wrap">
              <span class="img-mini" v-for="item in prod.Products" :key="item.ProdImg">
                <img width="100%" height="100%" :src="item.ProdImg" alt />
              </span>
            </div>
            <div class="prod-intro">{{prod.Intro}}</div>
          </template>
          <template v-else>
            <img class="prod-img" :src="prod.ProdImg" alt />
            <div class="img-wrap"></div>
            <div class="prod-intro">{{prod.ProdName}}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./components/element/Carousel";
export default {
  name: "App",
  data() {
    return {
      sliders: [
        {
          img: require("./assets/img/banner1.png"),
          href: ""
        }
        // {
        //   img: require("./assets/img/banner2.png"),
        //   href: ""
        // }
      ],
      products: [
        {
          current: 0,
          Intro: "OnePlus 8 Pro",
          Products: [
            {
              ProdName: "一加手机8",
              ProdPrice: "5000",
              ProdImg: require("./assets/img/prod1-1.png")
            },
            {
              ProdName: "一加手机8",
              ProdPrice: "4500",
              ProdImg: require("./assets/img/prod1-2.png")
            }
          ]
        },
        {
          current: 0,
          Intro: "OnePlus 8 Pro",
          Products: [
            {
              ProdName: "一加手机8",
              ProdPrice: "4000",
              ProdImg: require("./assets/img/prod2-1.png")
            },
            {
              ProdName: "一加手机8",
              ProdPrice: "3000",
              ProdImg: require("./assets/img/prod2-2.png")
            }
          ]
        },
        {
          ProdName: "一加旅行套装",
          ProdPrice: "200",
          ProdImg: require("./assets/img/prod3.png")
        }
      ]
    };
  }
};
</script>

<style lang="less">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.products {
  display: flex;
  .prod-wrap{
    width: 25%;
  }
  .prod-item {
    padding-bottom: 100%;
    height: 0;
  }
  .prod-img {
    height: 300px;
    max-width: 100%;
  }
  .img-wrap {
    height: 30px;
    line-height: 30px;
  }
  .img-mini {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #e8e8e8;
    margin: 0 2px;
    cursor: pointer;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #f1f1fd;
}
</style>
