import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from './component/MBanner.vue'
import CompInfo from './component/CompInfo.vue'
import MArticles from './component/MArticles.vue'
import MProducts from './component/MProducts.vue'
import ProdType from './component/ProdType.vue'

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
    name: 'Manage',
    component: Manage
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
    path: '/prodtype',
    name: 'prodtype',
    component: ProdType
  },
]

const router = new VueRouter({
  routes
})

export default router
