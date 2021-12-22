import Layout from '@/layout'

// 一个js文件内部只需要导出一个数据 默认导出
// 组织架构模块 很多页面 (二级路由) => 抽离出来为了好维护
export default {
  path: '/departments',
  component: Layout,
  children: [
    // 组织架构默认页面
    {
      path: '',
      // path: '/departments',
      name: 'departments', // 命名路由
      component: () => import('@/views/departments'),
      meta: { title: '组织架构', icon: 'tree' } // 路由添加额外的信息
    }
  ]
}
