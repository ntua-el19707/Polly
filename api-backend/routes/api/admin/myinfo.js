const {Router} = require('express');
const router = Router();
const {getInfo,putUser} = require('../../../controllers/admins/myInfo') 
router.route('/').get(getInfo).put(putUser); 

module.exports = router ;