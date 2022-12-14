import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')// 懒加载
  },
  {
    path: '/',
    redirect: '/home',
    // name: 'layout',
    component: () => import('@/views/layout'), // 懒加载
    children: [
      {
        path: 'home', // 默认子路由，只能有一个
        name: 'home',
        component: () => import('@/views/home')// 懒加载
      },
      {
        path: 'q&a',
        name: 'q&a',
        component: () => import('@/views/q&a')// 懒加载
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')// 懒加载
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')// 懒加载
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true//开启props传参，把路由参数映射到组件的props中
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
  }
]

const router = new VueRouter({
  routes
})

export default router
