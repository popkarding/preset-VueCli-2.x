
import moduleTest from './modules/test'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    moduleTest: Object.assign({}, {
      namespaced: true
    }, moduleTest)
  }
})

export default store
