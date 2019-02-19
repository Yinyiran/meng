import Vue from "vue";
import Router from "vue-router";
// 异步引入组件 // webpack 自动将构建完成的代码， 拆分到不同的 bundle 中，然后通过 Ajax 请求加载。
// 前端组件
const Home = () => import("../../components/index/home.vue");
const About = () => import("../../components/index/about.vue");
const WebProducts = () => import("../../components/index/products.vue");
const Articles = () => import("../../components/index/articles.vue");
const ArticlePage = () => import("../../components/article-page.vue");
const ProductPage = () => import("../../components/product-page.vue");
const ErrorComp = () => import("../../components/error.vue");

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      component: Home
    },
    {
      path: "/about",
      component: About
    },
    {
      path: "/products",
      component: WebProducts
    },
    {
      path: "/products/page",
      component: ProductPage
    },
    {
      path: "/articles",
      component: Articles
    },
    {
      path: "/articles/page",
      component: ArticlePage
    },
    {
      path: "/error",
      component: ErrorComp
    }
  ]
});

export default router;
