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
    path: '/',
    redirect: "/compinfo",
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/compinfo',
    name: 'compinfo',
    component: CompInfo
  },
  {
    path: '/banner',
    name: 'banner',
    component: MBanner
  },
  {
    path: '/article',
    name: 'article',
    component: MArticles
  },
  {
    path: '/products',
    name: 'products',
    component: MProducts
  },
  {
    path: '/imgs',
    name: 'imgs',
    component: MImgs
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
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
