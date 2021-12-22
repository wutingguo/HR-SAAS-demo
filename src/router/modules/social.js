import Layout from '@/layout'

// 一个js文件内部只需要导出一个数据 默认导出
// 社保模块 很多页面 (二级路由) => 抽离出来为了好维护
export default {
  path: '/social',
  component: Layout,
  children: [
    // 社保默认页面
    {
      path: '',
      // path: '/social',
      name: 'social', // 命名路由
      component: () => import('@/views/social'),
      meta: { title: '社保', icon: 'table' } // 路由添加额外的信息
    }
  ]
}
