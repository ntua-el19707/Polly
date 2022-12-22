const  express = require('express');
const router = express.Router() ;//set up router initialization

//const {authuser}= require('../config/authmiddlewares/auth') //import protection middleware

const admin_master_router = require('./api/admin/admin_master');
const managment_master_router = require('./api/managment/managment_master_router');//here will be protected 
const Answer_master_router =require('./api/Answer/answer_master_router');
const users_route = require('./user');
router.use('/',users_route);
router.use('/admin',admin_master_router);
//router.use('/',managment_master_router);
router.use('/',Answer_master_router);


module.exports = router ;