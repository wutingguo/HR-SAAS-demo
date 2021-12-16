import axios from 'axios'

// process.env=>>获取环境变量
const http = axios.create({
  // 配置请求的基地址
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

export default http
