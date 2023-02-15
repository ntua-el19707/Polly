const {Router} = require('express'); 
const router = Router();
//here the is limited protection only for polls with cretiria

//const {Criteria}  = require('../../../config/authmiddlewares/auth'); 

const questionnaire  = require('./questionnaire');
const questionnaire2  = require('./questionnaire2');
const question = require('./question') ;

const doanswer  = require('./doanswer'); 
const getsessionanswers  = require('./getsessionanswers');
const getquestionanswers  = require('./getquestionanswers');
const doanswerfill = require('./anwerstats')
const {changepass,forgot,testJwt} = require('../../../controllers/forgot')
const {authuserForForgotpass} =require('../../../config/authmiddlewares/auth')

router.use('/questionnaire',questionnaire);
router.use('/questionnaire2',questionnaire2);
router.use('/question',question);
router.use('/doanswer',doanswer); 

router.use('/fill',doanswerfill)
router.post('/forgot/change',authuserForForgotpass,changepass)
router.post('/forgot',forgot);
router.get('/validjwt/:tokkenLink',testJwt)

router.use('/getquestionanswers',getquestionanswers);
router.use('/getsessionanswers',getsessionanswers);


//router.use('/')
module.exports =router ;
