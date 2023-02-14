const {Router} = require('express');
const router = Router() ;


const {getanswers} =require('../../../controllers/answers/getquestionanswers')
router.get('/:questionaireID/:questionID',getanswers);

module.exports = router ;
