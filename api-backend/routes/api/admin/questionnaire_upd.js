const {Router} = require('express');
const router = Router() ;
const {create, update} =require('../../../controllers/admins/questionarie_upd')
router.route('/').post(create);
router.route('/:id').put(update)

module.exports = router ;
