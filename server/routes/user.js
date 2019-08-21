const router = require('koa-router')()
const UserController = require('../controllers/user');

router.prefix('/api/v1')

router.post('/user/register',UserController.register);

router.post('/user/login',UserController.login);

router.post('/user/get_user_info',UserController.getUserInfo)

router.post('/user/update_user_avatar',UserController.updateUserAvatar)


module.exports = router
