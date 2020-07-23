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
    path: '/products',
    name: 'products',
    component: () => import('./component/Products.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('./component/Articles.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./component/About.vue')
  },
  {
    path: '/product/:id',
    name: 'productPage',
    component: () => import('./component/ProductPage.vue')
  },
  {
    path: '/article/:id',
    name: 'articlePage',
    component: () => import('./component/ArticlePage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
