const router = require('koa-router')();
const ProductController = require('../controllers/product');

router.prefix('/api/v1')

//获取
router.get('/product/all',ProductController.getAllProduct)
router.get('/product/recent',ProductController.getRecentProduct)
router.get('/product/:id',ProductController.getProductDetail)


module.exports = router