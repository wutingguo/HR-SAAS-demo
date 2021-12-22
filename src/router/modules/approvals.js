import Layout from '@/layout'

// 一个js文件内部只需要导出一个数据 默认导出
// 审批模块 很多页面 (二级路由) => 抽离出来为了好维护
export default {
  path: '/approvals',
  component: Layout,
  children: [
    // 审批默认页面
    {
      path: '',
      // path: '/approvals',
      name: 'approvals', // 命名路由
      component: () => import('@/views/approvals'),
      meta: { title: '审批', icon: 'tree-table' } // 路由添加额外的信息
    }
  ]
}
