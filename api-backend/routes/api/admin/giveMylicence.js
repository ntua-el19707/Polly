const {Router} = require('express');
const router = Router() ;
const {requestChangePass} = require('../../../controllers/admins/givemeLicenseChangePass')
router.get('/:pass',requestChangePass);
module.exports = router ;