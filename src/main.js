import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import VueCookie from 'vue-cookie'
import '@/element-ui' 
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
import API from '@/api/index'

Vue.use(VueCookie)
Vue.config.productionTip = false
// 挂载全局
Vue.prototype.$API = API 

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
