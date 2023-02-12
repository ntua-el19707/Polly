const {Router} = require('express');
const router = Router() ;
const {DeleteMatehodresetall} = require('../../../controllers/admins/resetall')
router.route('/').delete(DeleteMatehodresetall);

module.exports = router ;