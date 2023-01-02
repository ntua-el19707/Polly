const{Router}=require('express'); 
const { getmypolls, deleteMypoll } = require('../../../controllers/admins/mypolls');
const router = Router();
router.route('/').get(getmypolls);
router.route('/:id').delete(deleteMypoll)
module.exports = router ; 
 // get  kai se  post 
 // post  => insert into
 // put => update  
 //delete 
 //patch en put 
 