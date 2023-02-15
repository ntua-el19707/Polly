const {Router} = require('express');
const router = Router() ;

const {create} =require('../../../controllers/answers/doanswer')

router.route('/:questionnaireID/:questionID/:session/:optionID').post(create);


module.exports = router ;


