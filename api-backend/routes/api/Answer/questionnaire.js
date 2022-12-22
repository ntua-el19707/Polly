const {Router} = require('express');
const router = Router() ;
const {questionaire} =require('../../../controllers/answers/questionaire')
router.get('/:id',questionaire);
module.exports = router ;
