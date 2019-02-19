import Vue from "vue";
import Router from "vue-router";
import { Cache } from "../../service";
// 异步引入组件 // webpack 自动将构建完成的代码， 拆分到不同的 bundle 中，然后通过 Ajax 请求加载。
const AdminHome = () => import("../../components/admin/home.vue");
const AdminArticles = () => import("../../components/admin/articles.vue");
const EditInfo = () => import("../../components/admin/editInfo.vue");
const AdminProducts = () => import("../../components/admin/products.vue");
const Setting = () => import("../../components/admin/setting.vue");
const Evaluate = () => import("../../components/admin/evaluate.vue");
const Images = () => import("../../components/admin/images.vue");
const ProductPage = () => import("../../components/product-page.vue");
const Login = () => import("../../components/admin/login.vue");

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/admin",
      redirect: "editInfo",
      meta: { requiresAuth: true }
    },
    {
      path: "editInfo",
      component: EditInfo,
      meta: { requiresAuth: true }
    },
    {
      path: "home",
      component: AdminHome,
      meta: { requiresAuth: true }
    },
    {
      path: "products/page",
      component: ProductPage,
      meta: { requiresAuth: true }
    },
    {
      path: "products",
      component: AdminProducts,
      meta: { requiresAuth: true }
    },
    {
      path: "images",
      component: Images,
      meta: { requiresAuth: true }
    },
    {
      path: "articles",
      component: AdminArticles,
      meta: { requiresAuth: true }
    },
    {
      path: "setting",
      component: Setting,
      meta: { requiresAuth: true }
    },
    {
      path: "evaluate",
      component: Evaluate,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      component: Login
    }
  ]
});

// 路由拦截
// 差点忘了说明,不是所有版块都需要鉴权的
// 所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requiresAuth)) {
    // 判断是否需要登录权限
    let user = Cache.get("user_info");
    if (!user) {
      // 没登录则跳转到登录界面
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
