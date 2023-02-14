
const {Router} = require('express');
const router = Router() ;
const {PostMatehodSessionGenarator} = require('../../../controllers/admins/SessionGenarator.js')

router.route('/:poll_id/:total').post(PostMatehodSessionGenarator)
module.exports = router ;
