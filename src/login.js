import Vue from 'vue'
import Index from './login/Login.vue'

import "./element/ManageEl"
import "./assets/style/common.less"
Vue.config.productionTip = false

new Vue({
  render: h => h(Index)
}).$mount('#app')
