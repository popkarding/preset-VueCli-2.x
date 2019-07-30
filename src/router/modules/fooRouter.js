
// import HelloWorld from '@/components/HelloWorld.vue'
const HelloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld'))) // 官方推荐懒加载方式
export default [
  {
    path: '/',
    name: 'HelloWorld',
    // component: HelloWorld
    // component: resolve => require(['@/components/HelloWorld.vue'], resolve) // 路由懒加载模式写法
    component: HelloWorld
  }
]
