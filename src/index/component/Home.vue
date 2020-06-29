<template>
  <div id="app">
    <div class="banner-wrap">
      <el-carousel indicator-position="none" :autoplay="false" height="360px">
        <el-carousel-item v-for="item in sliders" :key="item.BanID">
          <div class="img-wrap">
            <img class="banner-img" :src="item.BanImg" @click="openDetail(item)" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="menu-wrap">
      <span
        class="menu-item"
        v-for="(item,index) in classify"
        :class="{active:activeClass===index}"
        :key="index"
      >{{item.ClassName}}</span>
    </div>
    <!-- 产品 -->
    <div class="products">
      <div
        class="prod-wrap"
        v-for="(prod,index) in products"
        :key="index"
        @click="openProdPage(prod.ProdID)"
      >
        <product-img :prod="prod" :info="true" />
      </div>
    </div>
    <div class="article">
      <div
        class="arti-item"
        v-for="(item,index) in articles"
        :key="index"
        @click="openArtPage(item.ArtID)"
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
  import { Data } from "../../service";
  export default {
    name: "App",
    components: { ProductImg },
    data() {
      return {
        sliders: [],
        activeClass: 0,
        AboutID: 0,
        classify: [],
        articles: [],
        products: []
      };
    },
    mounted() {
      Data.get("/getBanner").then(res => {
        this.sliders = res.data;
      });
      Data.get("/getClassify").then(res => {
        this.classify = res.data;
        this.classify.unshift({ ClassID: 0, ClassName: "全部" });
      });
      Data.get("/getArticle", { isStar: 1 }).then(res => {
        this.articles = res.data;
      });
      Data.get("/getProdList", { ProdStar: 1 }).then(res => {
        res.data.forEach(item => {
          item.ProdImg = item.ProdImg.split(",");
        });
        this.products = res.data;
      });
    },
    methods: {
      carChange(index, prodIndex) {
        this.products[prodIndex].current = index;
      },
      miniChange(imgIndex, prodIndex) {
        this.$refs.carousel[prodIndex].setActiveItem(imgIndex);
      },
      openDetail(item) {
        if (item.BanType === 1) this.openProdPage(item.BanTargID);
        else this.openArtPage(item.BanTargID);
      },
      openProdPage(prodId) {
        this.$router.push(`/product/${prodId}`);
      },
      openArtPage(artId) {
        this.$router.push(`/article/${artId}`);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../../assets/style/color.less";

  .main-title {
    text-align: center;
    font-size: 24px;
    margin: 30px 0;
  }
  .menu-wrap {
    display: flex;
    justify-content: center;
    font-size: 16px;
    padding: 20px;
    .menu-item {
      margin: 0 10px;
      cursor: pointer;
      &:hover,
      &.active {
        color: @active;
      }
    }
  }
  .banner-wrap {
    position: relative;
    height: 360px;
    .img-wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
    }
    .banner-img {
      width: 100%;

      object-fit: contain;
    }
  }
  .products {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid @border;
    background-color: #f9f9f9;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      height: 0;
      bottom: 0;
      width: 100%;
      border-top: 1px solid #dfdfdf;
    }
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
