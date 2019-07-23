const router = require('koa-router')()
const UserAddressController = require('../controllers/user_address');

router.prefix('/api/v1')

router.post('/user_address/get',UserAddressController.getUserAddress);
router.post('/user_address/add',UserAddressController.addUserAddress);
router.post('/user_address/update',UserAddressController.updateUserAddress);



module.exports = router
