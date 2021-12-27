// 全局注册组件
import PageTools from '@/components/PageTools'
import UploadExcel from './UploadExcel'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
