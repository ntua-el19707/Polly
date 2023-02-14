const {Router} = require('express');
const router = Router() ;

//const {getsessionanswers} =require('../../../controllers/answers/getsessionanswers')
//router.get('/:questionnaireID/:session',getsessionanswers);


const {getanswers} =require('../../../controllers/answers/getsessionanswers')
router.get('/:questionaireID/:session',getanswers);

module.exports = router ;
