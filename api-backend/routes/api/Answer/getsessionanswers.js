const {Router} = require('express');
const router = Router() ;

const {getanswers} =require('../../../controllers/answers/getsessionanswers')
router.get('/:questionaireID/:session',getanswers);

module.exports = router ;
