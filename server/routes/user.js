const router = require('koa-router')()
const UserController = require('../controllers/user');

router.prefix('/api/v1')

router.post('/user/register',UserController.register);

router.post('/user/login',UserController.login);

router.post('/user/get_user_info',UserController.getUserInfo)


module.exports = router
