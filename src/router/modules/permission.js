import Layout from '@/layout'

// 一个js文件内部只需要导出一个数据 默认导出
// 权限管理模块 很多页面 (二级路由) => 抽离出来为了好维护
export default {
  path: '/permission',
  component: Layout,
  children: [
    // 权限管理默认页面
    {
      path: '',
      // path: '/permission',
      name: 'permission', // 命名路由
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'lock' } // 路由添加额外的信息
    }
  ]
}
