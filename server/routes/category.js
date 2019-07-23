const router = require('koa-router')();
const CategoryController = require('../controllers/category');

router.prefix('/api/v1')

//获取
router.get('/category/all',CategoryController.getAllCategory)

module.exports = router