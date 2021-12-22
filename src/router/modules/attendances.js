import Layout from '@/layout'

// 一个js文件内部只需要导出一个数据 默认导出
// 考勤模块 很多页面 (二级路由) => 抽离出来为了好维护
export default {
  path: '/attendances',
  component: Layout,
  children: [
    // 考勤默认页面
    {
      path: '',
      // path: '/attendances',
      name: 'attendances', // 命名路由
      component: () => import('@/views/attendances'),
      meta: { title: '考勤', icon: 'skill' } // 路由添加额外的信息
    }
  ]
}
