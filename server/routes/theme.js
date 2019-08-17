const router = require('koa-router')();
const ThemeController = require('../controllers/theme');

router.prefix('/api/v1')

router.get('/theme/get_all',ThemeController.getAllTheme)
router.get('/theme/:id',ThemeController.getThemeItem)

module.exports = router