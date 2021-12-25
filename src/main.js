import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

import component from '@/components'
Vue.use(component)
import * as filter from '@/filters'
Object.keys(filter).forEach((item) => {
  Vue.filter(item, filter[item])
})
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
import * as directives from './directives'
// 封装一个全局自定义指令 directive函数 有两个参数 ,第一个是指令名,第二个是对象
// Vue.directive('defImg', {
//   // 对象里有一个重要的钩子函数 inserted 有两个参数,第一个 el ,指令所在的元素,第二个,binding指令的信息对象
//   inserted(el, binding) {
//     // 触发时机: 指令所在的dom元素插入页面中的时候
//     // console.log(binding, el)
//     // img标签有一个error的事件,需要图片不能正常展示才能触发
//     el.onerror = function() {
//       // binding.value 指令的值 就是指令等于号后面的值
//       el.src = binding.value
//     }
//   }
// })
for (const key in directives) {
  Vue.directive(key, directives[key])
}
// Vue.directive('defImg', defImg)
// Vue.directive('color', color)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
