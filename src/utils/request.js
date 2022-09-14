/*
请求模块
*/
import axios from 'axios'
import store from '@/store/index'
import JSONBig from 'json-bigint'
//JSONBig可以处理数据中超出JavaScript安全整数范围的问题，JSONBig.parse()、JSONBig.stringify()

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',// 接口基准路径
  //自定义后端返回的原始数据
  transformResponse: [function (data) {
    // 对接收的 data 进行任意转换处理
    try {
      return JSONBig.parse(data)
    } catch(err) {
      return data
    }
  }],
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
