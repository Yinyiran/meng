import Vue from 'vue'
import Index from './index/Index.vue'
import router from './index/router'

import "./element/IndexEl"
import "./assets/style/common.less"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(Index)
}).$mount('#app')
