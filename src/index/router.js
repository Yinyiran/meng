import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './component/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import(/* webpackChunkName: "about" */ './component/Product.vue')
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import(/* webpackChunkName: "about" */ './component/Article.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
