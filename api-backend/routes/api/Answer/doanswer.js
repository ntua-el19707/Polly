const {Router} = require('express');
const router = Router() ;
const {doanswery} =require('../../../controllers/answers/doanswer')
router.post('/:qqid/:qid/:session/:optionid', doanswery);
//router.post('/:qqid/:qid/:session', doanswery);
module.exports = router ;


