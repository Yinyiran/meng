<template>
  <div class="home">
    <header class="header">
      <span class="item" @click="tabSwitch"><img class="logo" :src="logo"></span>
      <span class="item" v-for="tab in tabs" :class="{active:isActive(tab)}" :key="tab.component" @click="tabSwitch(tab)">{{tab.label}}</span>
      <a class="item el-icon-setting" href="http://localhost:88/admin"></a>
    </header>
    <component :is="componentId"></component>
  </div>
</template>

<script>
import { API } from "../../service";
const Home = () => import("../../components/index/home.vue");
const About = () => import("../../components/index/about.vue");
const Products = () => import("../../components/index/products.vue");
const Articles = () => import("../../components/index/articles.vue");
const ArticlePage = () => import("../../components/article-page.vue");
const ProductPage = () => import("../../components/product-page.vue");
const ErrorComp = () => import("../../components/error.vue");
export default {
  data() {
    return {
      logo: API.imgSrc + "avatar.png",
      componentId: "Home",
      tabs: [
        {
          label: "首页",
          component: "Home"
        },
        {
          label: "产品列表",
          component: "Products"
        },
        {
          label: "行业新闻",
          component: "Articles"
        },
        {
          label: "关于我们",
          component: "About"
        }
      ]
    };
  },
  methods: {
    tabSwitch({ component = "index" } = {}) {
      this.componentId = component;
    },
    isActive(item) {
      return location.pathname.includes(item.to);
    }
  },
  components: {
    Home,
    About,
    Products,
    Articles,
    ArticlePage,
    ProductPage,
    ErrorComp
  }
};
</script>

<style lang="scss">
@import "../../assets/css/variable.scss";
@font-face {
  font-family: "iconfont"; /* project id 802637 */
  src: url("//at.alicdn.com/t/font_802637_2rx54x3hlnp.eot");
  src: url("//at.alicdn.com/t/font_802637_2rx54x3hlnp.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_802637_2rx54x3hlnp.woff") format("woff"),
    url("//at.alicdn.com/t/font_802637_2rx54x3hlnp.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_802637_2rx54x3hlnp.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  background-color: $bgColor;
  overflow: overlay;
}

a {
  text-decoration: none;
}

.header {
  box-sizing: border-box;
  background-color: $gray-d;
  text-align: center;
  font-size: $fontSize;
  .logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 10px;
  }
  .item {
    display: inline-block;
    width: 100px;
    height: 60px;
    color: #fff;
    vertical-align: top;
    line-height: 60px;
    cursor: pointer;
    &.active {
      color: $comColor;
    }
    &.el-icon-setting {
      float: right;
      font-size: 20px;
      line-height: 60px;
    }
  }
  .language {
    float: right;
    padding-right: 30px;
    font-size: 12px;

    & a {
      padding: 0 10px;
      line-height: 60px;

      &.active {
        color: #fff;
      }
    }
  }
}
</style>
