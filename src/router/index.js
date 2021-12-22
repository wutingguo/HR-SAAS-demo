import Vue from 'vue'
import Router from 'vue-router'
// 引入多个模块的规则
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'

// 动态路由表 => 动态路由(需要权限才可以访问的) 我们这里准备一个数组存放
export const asyncRoutes = [
  departmentsRouter,
  approvalsRouter,

  employeesRouter,
  permissionRouter,
  attendancesRouter,
  salarysRouter,
  settingRouter,
  socialRouter
]

// 安装语法!!
Vue.use(Router)

/* Layout */
// 布局架子
import Layout from '@/layout'

// 这种方式会组件全部加载 => 首屏加载很慢
// import Login from '@/views/Login'
// 懒加载方式
// const Login = () => import('@/views/Login')

// const routes = [
//   { path: '/login', component: Login }
// ]

// const router = new Router({
//   routes: routes
// })

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 一级路由 登录页
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 一级路由 404 报错页
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 一级路由  首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      // 首页的二级路由
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '主页', icon: 'dashboard' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }), // 管理滚动行为, 让页面切换时回到顶部
  routes: [...constantRoutes, ...asyncRoutes] // 临时合并动态路由和静态路由
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
