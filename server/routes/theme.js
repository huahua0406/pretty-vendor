const router = require('koa-router')();
const ThemeController = require('../controllers/theme');

router.prefix('/api/v1')

//获取
router.get('/theme/all',ThemeController.getAllTheme)
router.get('/theme/:id',ThemeController.getThemeItem)

module.exports = router