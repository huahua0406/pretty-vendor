import request from '@/utils/request'

export default {
  fetchTodoList () {
    return request.get('http://jsonplaceholder.typicode.com/todos')
  },
  fetchPostList (params) {
    return request({
      url: 'http://jsonplaceholder.typicode.com/posts',
      method: 'get',
      params
    })
  },
  postForm (data) {
    return request({
      url: 'http://jsonplaceholder.typicode.com/posts',
      method: 'post',
      data
    })
  }
}
