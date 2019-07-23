import request from '@/utils/request'

export default {
  getAllCategory () {
    return request.get('/category/all')
  }
}
