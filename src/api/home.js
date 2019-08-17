import request from '@/utils/request'

export default {
  getBannerList () {
    return request.get('/banner/1')
  },
  getTopicList () {
    return request.get('/theme/get_all')
  },
  getRecentList () {
    return request.get('/product/get_recent')
  },
  getTopicItem (id) {
    return request.get(`/theme/${id}`)
  }
}
