const {exist}  = require('../../../config/authmiddlewares/auth')
const {Router} = require('express')
const router = Router() ;
const {register}= require('../../../controllers/register')
router.use(exist);
//To do implement the controllers for  register and change pass (Hint  implement function new user ,and update user
//choose through  mode )
router.post('/',register)
module.exports = router ;

