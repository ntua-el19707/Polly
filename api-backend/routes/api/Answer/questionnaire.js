const {Router} = require('express');
const router = Router() ;
const { getQuestionarie} =require('../../../controllers/answers/questionaire')
router.get('/:id',getQuestionarie);

module.exports = router ;
