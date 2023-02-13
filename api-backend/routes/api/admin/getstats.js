const {Router} = require('express');
const router = Router() ;
const {getstats} = require('../../../controllers/admins/getstats');
router.get('/:questionnaireID',getstats);
module.exports = router ;