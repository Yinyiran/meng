import Vue from 'vue'
import VueRouter from 'vue-router'
const MBanner = () => import('./page/MBanner.vue')
const CompInfo = () => import('./page/CompInfo.vue')
const MArticles = () => import('./page/MArticles.vue')
const MProducts = () => import('./page/MProducts.vue')
const Classify = () => import('./page/Classify.vue')
const MImgs = () => import('./page/MImgs.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/compinfo",
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
    path: '/classify',
    name: 'classify',
    component: Classify
  },
]

const router = new VueRouter({
  routes
})

export default router
