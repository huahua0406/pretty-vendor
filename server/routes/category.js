const router = require('koa-router')();
const CategoryController = require('../controllers/category');

router.prefix('/api/v1')

router.get('/category/get_all',CategoryController.getAllCategory)

module.exports = router