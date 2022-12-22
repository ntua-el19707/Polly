const {Router} = require('express');
const router = Router() ;
//import login - post controller
const {login} = require('../controllers/login')
router.route('/login').post(login).get((req,res,next)=>{
    res.send('h');
});
//to_do_later logout 
//router.route('/logout').post(/*controller*/)
module.exports = router ;