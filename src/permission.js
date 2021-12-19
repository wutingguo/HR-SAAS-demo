// 配置路由守卫的
import router from '@/router'
import store from '@/store'
const WHITE_LIST = ['/login', '/404']
router.beforeEach(async(to, form, next) => {
  if (store.state.user.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      const res = await store.dispatch('user/getProfile')
      console.log(res, 13221)
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
