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
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('../views/HomeView'),
        name: 'home',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/',
  //   name: 'home',
  //
  //   component: () => import('../views/HomeView'),
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:constantRoutes
})

export default router
