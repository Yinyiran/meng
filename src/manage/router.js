import Vue from 'vue'
import VueRouter from 'vue-router'
import MBanner from './component/MBanner.vue'
import CompInfo from './component/CompInfo.vue'
import MArticles from './component/MArticles.vue'
import MProducts from './component/MProducts.vue'
import Classify from './component/Classify.vue'
import MImgs from './component/MImgs.vue'

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
