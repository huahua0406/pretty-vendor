const router = require('koa-router')()
const UserController = require('../controllers/user');

router.prefix('/api/v1')

//创建文章
router.post('/user/register',UserController.register);

router.post('/user/login',UserController.login);

//获取文章详情
router.post('/user/userinfo',UserController.getUserInfo)


module.exports = router
