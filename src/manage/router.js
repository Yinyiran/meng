import Vue from 'vue'
import VueRouter from 'vue-router'
const MBanner = () => import('./page/MBanner.vue')
const CompInfo = () => import('./page/CompInfo.vue')
const MArticles = () => import('./page/MArticles.vue')
const MProducts = () => import('./page/MProducts.vue')
const MImgs = () => import('./page/MImgs.vue')
const About = () => import('./page/MAbout.vue')
const Login = () => import('./page/Login.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/manage',
    redirect: "/manage/compinfo",
  },
  {
    path: '/manage/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/manage/compinfo',
    name: 'compinfo',
    component: CompInfo
  },
  {
    path: '/manage/banner',
    name: 'banner',
    component: MBanner
  },
  {
    path: '/manage/article',
    name: 'article',
    component: MArticles
  },
  {
    path: '/manage/products',
    name: 'products',
    component: MProducts
  },
  {
    path: '/manage/imgs',
    name: 'imgs',
    component: MImgs
  },
  {
    path: '/manage/about',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem("userid") && to.name !== "login") {
    router.push("/login")
    next();
  } else {
    next()
  }
})
export default router
