import Vue from 'vue'
import App from './App'
import router from './router/index'
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
