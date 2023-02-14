const {Router} = require('express');
const router = Router() ;
const {postCreate,putupdate} =require('../../../controllers/admins/questionarie_upd')
router.route('/').post(postCreate);
router.route('/:id').put(putupdate)

module.exports = router ;
