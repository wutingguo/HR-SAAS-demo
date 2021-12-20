// 配置路由守卫的
import router from '@/router'
import store from '@/store'
const WHITE_LIST = ['/login', '/404']
router.beforeEach(async(to, form, next) => {
  if (store.state.user.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 这里会出现每次切换侧边栏都会请求数据,我们需要判断厂库store里面有没有,有的话就不再请求了

      if (!store.state.user.userInfo.companyId) {
        const res = await store.dispatch('user/getProfile')
        console.log(res, 13221)
      }
      next()
    }
  } else {
    if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
