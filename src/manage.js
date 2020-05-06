import Vue from 'vue'
import Index from './manage/Index.vue'
import router from './manage/router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(Index)
}).$mount('#app')
