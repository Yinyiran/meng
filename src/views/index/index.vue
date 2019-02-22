<template>
  <div class="home">
    <header class="header">
      <span class="item" @click="reloadPage"><img class="logo" :src="logo"></span>
      <span class="item" v-for="tab in tabs" :class="{active:isActive(tab)}" :key="tab.component" @click="tabSwitch(tab.component)">{{tab.label}}</span>
      <a class="item el-icon-setting" href="http://localhost:88/admin"></a>
    </header>
    <component :is="componentId"></component>
  </div>
</template>

<script>
import { API } from "../../service";
import Event from "../../service/Event.js";
export default {
  created() {
    if (location.pathname == "/") {
      window.history.pushState(null, null, `${location.origin}/home`);
      this.componentId = "home";
    }
    let compIds = this.tabs.map(tab => tab.component);
    let pathname = location.pathname.replace(/\//g, "");
    if (compIds.includes(pathname)) this.componentId = pathname;
    Event.$on("change_router", compId => {
      this.tabSwitch(compId);
    });
  },
  data() {
    return {
      logo: API.imgSrc + "avatar.png",
      componentId: "home",
      tabs: [
        {
          label: "首页",
          component: "home"
        },
        {
          label: "产品列表",
          component: "products"
        },
        {
          label: "行业新闻",
          component: "articles"
        },
        {
          label: "关于我们",
          component: "about"
        }
      ]
    };
  },
  methods: {
    tabSwitch(component = "home") {
      this.componentId = component;
      window.history.pushState(null, null, `${location.origin}/${component}`);
    },
    reloadPage() {
      window.location.reload();
    },
    isActive(item) {
      return location.pathname.includes(item.component);
    }
  },
  components: {
    home: () => import("../../components/index/home.vue"),
    about: () => import("../../components/index/about.vue"),
    products: () => import("../../components/index/products.vue"),
    articles: () => import("../../components/index/articles.vue"),
    ArticlePage: () => import("../../components/article-page.vue"),
    ProductPage: () => import("../../components/product-page.vue"),
    ErrorComp: () => import("../../components/error.vue")
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
