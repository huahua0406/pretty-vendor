/**
 * api接口的统一出口
 */
import example from '@/api/example'
// 其他模块的接口……
import home from '@/api/home'
import category from './category'
import product from '@/api/product'
import user from '@/api/user'
// import user from '@/api/user'
// 导出接口
export default {
  ...example,
  ...home,
  ...category,
  ...product,
  ...user
}
