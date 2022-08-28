/*
请求模块
*/
import axios from 'axios'
import store from '@/store/index'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'// 接口基准路径
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 务必要返回config的配置对象，否则请求会停在这里出不去
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器

export default request
