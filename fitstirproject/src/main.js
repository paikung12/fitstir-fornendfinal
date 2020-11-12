import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'
import  axios from '@/plugins/axios'

Vue.config.productionTip = false

window.axios = axios
// window.axios = axios.create({
//   baseURL: 'http://191.168.1.144:8000/',
//   timeout: 1000,
// })
if (localStorage.getItem('access_token')) {
  window.axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access_token')}`;
}


Vue.prototype.$url = 'http://192.168.1.144:8000'



new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
