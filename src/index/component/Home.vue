<template>
  <div id="app">
    <div class="header">
      <div class="classify-wrap">
        <span
          class="crumb-item"
          v-for="(item,index) in menu"
          :class="{active:activeCrumb===index}"
          :key="index"
        >{{item.Name}}</span>
      </div>
    </div>
    <div class="banner-wrap">
      <el-carousel indicator-position="none" :autoplay="false">
        <el-carousel-item v-for="item in sliders" :key="item.img">
          <img :src="item.img" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main-title">主营产品</div>
    <div class="classify-wrap">
      <span
        class="crumb-item"
        v-for="(item,index) in classify"
        :class="{active:activeClass===index}"
        :key="index"
      >{{item.ClassName}}</span>
    </div>
    <div class="products">
      <div
        class="prod-wrap"
        v-for="(prod,index) in products"
        :key="index"
        @click="openProdDetail(prod)"
      >
        <product-img :prod="prod" :info="true" />
      </div>
    </div>
    <div class="main-title">客户案例</div>
    <div class="article">
      <div
        class="arti-item"
        v-for="(item,index) in articles"
        :key="index"
        @click="openArtPage(item)"
      >
        <div class="arti-img-wrap">
          <img class="arti-img" :src="item.ArtCover" alt />
        </div>
        <div class="arti-title">{{item.ArtTitle}}</div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-item">电话:15692390339</div>
      <div class="footer-item">微信</div>
      <div class="footer-item">在线客服</div>
    </div>
  </div>
</template>

<script>
  import "../../element/Carousel";
  import ProductImg from "../../components/ProductImg";
  import { HTTP } from "../../service";
  export default {
    name: "App",
    components: { ProductImg },
    data() {
      return {
        sliders: [
          {
            img: require("../../assets/img/banner1.png"),
            href: ""
          },
          {
            img: require("../../assets/img/banner2.png"),
            href: ""
          }
        ],
        activeCrumb: 0,
        activeClass: 0,
        menu: [
          {
            Name: "主营产品"
          },
          {
            Name: "客户案例"
          },
          {
            Name: "联系我们"
          },
          {
            Name: "关于我们"
          }
        ],
        classify: [],
        articles: [],
        products: [
          {
            current: 0,
            Intro: "OnePlus 8 Pro",
            Products: [
              {
                ProdName: "一加手机8",
                ProdPrice: "5000",
                ProdImg: require("../../assets/img/prod1-1.png")
              },
              {
                ProdName: "一加手机8",
                ProdPrice: "4500",
                ProdImg: require("../../assets/img/prod1-2.png")
              }
            ]
          },
          {
            ProdName: "一加旅行套装",
            ProdPrice: "200",
            ProdImg: require("../../assets/img/prod3.png")
          },
          {
            current: 0,
            Intro: "OnePlus 8 Pro",
            Products: [
              {
                ProdName: "一加手机8",
                ProdPrice: "4000",
                ProdImg: require("../../assets/img/prod2-1.png")
              },
              {
                ProdName: "一加手机8",
                ProdPrice: "3000",
                ProdImg: require("../../assets/img/prod2-2.png")
              }
            ]
          },

          {
            ProdName: "一加旅行套装",
            ProdPrice: "200",
            ProdImg: require("../../assets/img/prod3.png")
          },
          {
            current: 0,
            Intro: "OnePlus 8 Pro",
            Products: [
              {
                ProdName: "一加手机8",
                ProdPrice: "5000",
                ProdImg: require("../../assets/img/prod1-1.png")
              },
              {
                ProdName: "一加手机8",
                ProdPrice: "4500",
                ProdImg: require("../../assets/img/prod1-2.png")
              }
            ]
          },
          {
            ProdName: "一加旅行套装",
            ProdPrice: "200",
            ProdImg: require("../../assets/img/prod3.png")
          },
          {
            current: 0,
            Intro: "OnePlus 8 Pro",
            Products: [
              {
                ProdName: "一加手机8",
                ProdPrice: "4000",
                ProdImg: require("../../assets/img/prod2-1.png")
              },
              {
                ProdName: "一加手机8",
                ProdPrice: "3000",
                ProdImg: require("../../assets/img/prod2-2.png")
              }
            ]
          },
          {
            ProdName: "一加旅行套装",
            ProdPrice: "200",
            ProdImg: require("../../assets/img/prod3.png")
          }
        ]
      };
    },
    mounted() {
      HTTP.get("/getBanner").then(res => {
        console.log(res);
      });
      HTTP.get("/getClassify").then(res => {
        this.classify = res.data;
      });
      HTTP.get("/getArticle", { isStar: 1 }).then(res => {
        this.articles = res.data;
      });
    },
    methods: {
      carChange(index, prodIndex) {
        this.products[prodIndex].current = index;
      },
      miniChange(imgIndex, prodIndex) {
        this.$refs.carousel[prodIndex].setActiveItem(imgIndex);
      },
      openProdDetail(prod) {
        this.$router.push(`/product/${prod.ID}`);
      },
      openArtPage(art) {
        this.$router.push(`/article/${art.ArtID}`);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../../assets/style/color.less";
  body {
    margin: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
  }
  .classify-wrap {
    border-bottom: 1px solid @border;
    display: flex;
    justify-content: center;
    padding: 20px;
    .crumb-item {
      margin: 0 10px;
      cursor: pointer;
      &:hover,
      &.active {
        color: @active;
      }
    }
  }
  .main-title {
    text-align: center;
    font-size: 24px;
    margin: 30px 0;
  }
  .banner-wrap {
    position: relative;
    height: 360px;
  }
  .products {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid @border;
    background-color: #f9f9f9;
    .prod-wrap {
      position: relative;
      width: 25%;
      border-right: 1px solid @border;
      border-bottom: 1px solid @border;
      background-color: #f9f9f9;
      transition: 0.25s;
      box-sizing: border-box;
      &:hover {
        background-color: #fff;
      }
    }
  }

  .article {
    display: flex;
    margin-top: 20px;
    justify-content: center;
    .arti-item {
      width: 300px;
      margin: 0 10px;
      border: 1px solid @border;
      text-align: center;
      padding-bottom: 20px;
      cursor: pointer;
      &:hover {
        .arti-img {
          transform: scale(1.1);
        }
        .arti-title {
          color: @active;
        }
      }
    }
    .arti-img-wrap {
      height: 200px;
      overflow: hidden;
    }
    .arti-img {
      transition: all 0.25s;
      width: 100%;
    }
    .arti-title {
      margin-top: 10px;
    }
  }

  .footer {
    display: flex;
    height: 200px;
    justify-content: center;
    align-items: center;
    .footer-item {
      margin: 30px;
    }
  }
  .el-carousel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .el-carousel__container {
    height: 100%;
  }
  @media screen and (max-width: 900px) {
    .products {
      .prod-wrap {
        width: 33.33333%;
      }
    }
  }

  @media screen and (min-width: 1400px) {
    .products {
      .prod-wrap {
        width: 20%;
      }
    }
  }
  @media screen and (min-width: 2000px) {
    .products {
      .prod-wrap {
        width: 16.66666%;
      }
    }
  }
</style>
