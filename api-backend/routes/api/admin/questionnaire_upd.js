const {Router} = require('express');
const router = Router() ;
const {create} =require('../../../controllers/admins/questionarie_upd')
router.post('/',create);
module.exports = router ;
