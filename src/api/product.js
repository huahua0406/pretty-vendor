import request from '@/utils/request'

export default {
  getAllProduct () {
    return request.get('/product/all')
  },
  getProductDetail (id) {
    return request.get(`/product/${id}`)
  }
}
