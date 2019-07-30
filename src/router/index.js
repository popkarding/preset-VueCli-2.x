import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import fooRouter from './modules/fooRouter'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  // base: '/dist',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    ...fooRouter
  ]
})
router.beforeEach((to, from, next) => {
  // to and from are Route Object,next() must be called to resolve the hook
  // 标题变更
  if (document.title !== to.meta.title) {
    document.title = to.meta.title
  }

  next()
})
export default router
