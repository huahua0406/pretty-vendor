const router = require('koa-router')();
const ProductController = require('../controllers/product');

router.prefix('/api/v1')

router.get('/product/get_all',ProductController.getAllProduct)
router.get('/product/get_recent',ProductController.getRecentProduct)
router.get('/product/:id',ProductController.getProductDetail)


module.exports = router