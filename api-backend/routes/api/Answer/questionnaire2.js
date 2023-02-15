const {Router} = require('express');
const router = Router() ;
const {questionnaire2} =require('../../../controllers/answers/questionnaire2')
router.get('/:questionnaireID',questionnaire2);
module.exports = router ;
