<template>
  <div>
    <div class="banner-wrap">
      <el-carousel indicator-position="none" :autoplay="false" height="360px">
        <el-carousel-item v-for="item in sliders" :key="item.BanID">
          <div class="img-wrap">
            <img class="banner-img" :src="item.BanImg" @click="openBanDetail(item)" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 产品 -->
    <div class="main-title">PRODUCTS</div>
    <product-list :list="products"/>
    <div class="main-title">ARTICLE</div>
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
  </div>
</template>

<script>
  import ProductList from "../component/ProductList";
  import { Data } from "../../service";
  export default {
    name: "App",
    components: { ProductList },
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
      Data.get("/getArticle", { isStar: 1 }).then(res => {
        this.articles = res.data;
      });
      Data.get("/getProdList", { ProdStar: 1 }).then(res => {
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
      openBanDetail(item) {
        if (item.BanType === 1) this.openProdPage(item.BanTargID, 0);
        else this.openArtPage(item.BanTargID);
      },
      openProdPage(prodId, index) {
        this.$router.push(`/product/${prodId}-${index}`);
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
    padding: 40px 0;
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
      margin-top: 20px;
      line-height: 1.5;
      color: #999;
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
