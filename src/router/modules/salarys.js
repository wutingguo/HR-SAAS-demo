import Layout from '@/layout'

// 一个js文件内部只需要导出一个数据 默认导出
// 薪资模块 很多页面 (二级路由) => 抽离出来为了好维护
export default {
  path: '/salarys',
  component: Layout,
  children: [
    // 薪资默认页面
    {
      path: '',
      // path: '/salarys',
      name: 'salarys', // 命名路由
      component: () => import('@/views/salarys'),
      meta: { title: '薪资', icon: 'money' } // 路由添加额外的信息
    }
  ]
}
