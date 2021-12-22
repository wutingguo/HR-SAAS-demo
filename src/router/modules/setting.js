import Layout from '@/layout'

// 一个js文件内部只需要导出一个数据 默认导出
// 公司设置模块 很多页面 (二级路由) => 抽离出来为了好维护
export default {
  path: '/setting',
  component: Layout,
  children: [
    // 公司设置默认页面
    {
      path: '',
      // path: '/setting',
      name: 'setting', // 命名路由
      component: () => import('@/views/setting'),
      meta: { title: '公司设置', icon: 'setting' } // 路由添加额外的信息
    }
  ]
}
