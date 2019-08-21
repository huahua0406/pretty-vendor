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
      url: '/user/get_user_info',
      method: 'post',
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
  },
  updateUserAvatar(data){
    return request({
        url: '/user/update_user_avatar',
        method: 'post',
        data
      })
  }
}
