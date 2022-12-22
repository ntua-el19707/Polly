const {Router} = require('express');
const router = Router() ;
const {health} = require('../../../controllers/admins/health')
router.get('/',health);
module.exports = router ;