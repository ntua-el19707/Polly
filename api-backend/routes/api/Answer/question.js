const {Router} = require('express');
const router = Router() ;

const {question} =require('../../../controllers/answers/question')

router.get('/:questionaireID/:questionID',question);


module.exports = router ;
