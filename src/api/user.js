import request from '@/utils/request'

export default {
  login (data) {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },
  register (data) {
    return request({
      url: '/user/register',
      method: 'post',
      data
    })
  },
  getUserInfo (params) {
    return request({
      url: '/user/info',
      method: 'get',
      params
    })
  },
  addUserAddress (data) {
    return request({
      url: '/user_address/add',
      method: 'post',
      data
    })
  },
  getUserAddress (data) {
    return request({
      url: '/user_address/get',
      method: 'post',
      data
    })
  },
  updateUserAddress (data) {
    return request({
      url: '/user_address/update',
      method: 'post',
      data
    })
  }
}
