const router = require('koa-router')();
const BannerController = require('../controllers/banner');

router.prefix('/api/v1')

//获取banner
router.get('/banner/:id',BannerController.getBannerItems)

module.exports = router
