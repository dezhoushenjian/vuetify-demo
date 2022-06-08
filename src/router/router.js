import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/layout'

Vue.use(Router)

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('../views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('../views/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('../views/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('../views/HomeView'),
        name: 'home',
        meta: { title: '合兴巡检', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    children: [
      {
        path: 'chart',
        component: () => import('../views/report/chart'),
        name: 'chart',
        meta: { title: '报表', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    children: [
      {
        path: 'message',
        component: () => import('../views/news/message'),
        name: 'message',
        meta: { title: '消息', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: 'info',
        component: () => import('../views/about/info'),
        name: 'info',
        meta: { title: '我的信息', icon: 'dashboard', affix: true }
      }
    ]
  },

]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:constantRoutes
})

export default router
