import axios from 'axios'
import router from '@/router'
import { Toast } from 'vant'
// console.log(process.env)
// https://juejin.im/post/5b55c118f265da0f6f1aa354

// 创建axios 实例
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
})

axiosInstance.interceptors.request.use(config => {
  // 这里可以自定义一些config 配置, 比如添加token
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
}, function (error) {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(response => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  if (error.response.status) {
    switch (error.response.status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        Toast({
          message: '登录过期，请重新登录',
          duration: 1000,
          forbidClick: true
        })
        // 清除token
        localStorage.removeItem('token')
        // store.commit('loginSuccess', null)
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        }, 1000)
        break
      // 404请求不存在
      case 404:
        Toast({
          message: '网络请求不存在',
          duration: 1500,
          forbidClick: true
        })
        break
      // 其他错误，直接抛出错误提示
      default:
        Toast({
          message: error.response.data.msg,
          duration: 1500,
          forbidClick: true
        })
    }
    return Promise.reject(error.response)
  }
})

export default axiosInstance
