// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import api from './request/index'
import './utils/rem'
import store from './store/index'

import FastClick from 'fastclick' // fastclick引入及初始化，fix移动端点击300ms延迟问题
FastClick.attach(document)
Vue.prototype.$api = api

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
