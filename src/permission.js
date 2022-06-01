import router from './router/router'
import store from './store'
import { getToken } from './utils/auth'
import { Toast } from 'vant';

const whiteList = ['/login', '/auth-redirect', '/bind', '/register','/qrCode']
router.beforeEach((to, from, next) => {

  if (getToken()) {
    to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })

    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(() => {
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            // router.addRoutes(accessRoutes) // 动态添加可访问路由表
            for(let i=0,length=accessRoutes.length;i<length;i+=1){
              const element=accessRoutes[i]
              router.addRoute(element)
            }
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        }).catch(err => {
            store.dispatch('LogOut').then(() => {
              Toast({message: err, forbidClick: true})
              next({ path: '/' })
            })
          })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页

    }
  }
})

router.afterEach(() => {

})



