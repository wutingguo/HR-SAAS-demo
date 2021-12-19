import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// process.env=>>获取环境变量
const http = axios.create({
  // 配置请求的基地址
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 添加请求拦截器
http.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = 'Bearer ' + store.getters.token
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const res = response.data
  if (!res.success) {
    Message.error(res.message)
    return Promise.reject(new Error(res.message))
  }
  return res
}, function(error) {
  // 对响应错误做点什么
  Message.error(error.message)
  return Promise.reject(error)
})

export default http
