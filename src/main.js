// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import apiConfig from '../config/api.config.js'



var axiosInstance = axios.create({
  baseURL: apiConfig.baseURL
  // baseURL: location.protocol + '//127.0.0.1:8080',
  // transformRequest: function (data) {
  //   return Qs.stringify(data)
  // },
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axiosInstance)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
