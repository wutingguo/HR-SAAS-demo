import Layout from '@/layout'

// 一个js文件内部只需要导出一个数据 默认导出
// 员工模块 很多页面 (二级路由) => 抽离出来为了好维护
export default {
  path: '/employees',
  component: Layout,
  children: [
    // 员工默认页面
    {
      path: '',
      // path: '/employees',
      name: 'employees', // 命名路由
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' } // 路由添加额外的信息
    },
    {
      path: 'detail/:id', // 动态路由参数
      component: () => import('@/views/employees/detail'),
      hidden: true,
      meta: {
        title: '员工详情'
      }
    }
  ]
}
