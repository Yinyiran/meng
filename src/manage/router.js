import Vue from 'vue'
import VueRouter from 'vue-router'
import MBanner from './page/MBanner.vue'
import CompInfo from './page/CompInfo.vue'
import MArticles from './page/MArticles.vue'
import MProducts from './page/MProducts.vue'
import Classify from './page/Classify.vue'
import MImgs from './page/MImgs.vue'
import Language from './page/Language.vue'

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
  {
    path: '/language',
    name: 'language',
    component: Language
  },
]

const router = new VueRouter({
  routes
})

export default router
