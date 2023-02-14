const {Router} = require('express');
const router = Router() ;
const {PostMatehodanwerstats} = require('../../../controllers/answers/anwerstats.js')

router.route('/:poll_id/:session_id').post(PostMatehodanwerstats)
module.exports = router ;
