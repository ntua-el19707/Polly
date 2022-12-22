const {Router} = require('express'); 
const router = Router();
//here the is limited protection only for polls with cretiria

const {Criteria}  = require('../../../config/authmiddlewares/auth'); 

const questionnaire  = require('./questionnaire');
const question = require('./question') ;
const doanswer  = require('./doanswer'); 
const getsessionanswers  = require('./getsessionanswers');
const getquestionanswers  = require('./getquestionanswers');

router.use('/questionnaire',questionnaire);
router.use('/question',question);
//router.use('/')
module.exports =router 