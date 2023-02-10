const {Router} = require('express');
const router = Router();
const {authuser}  = require('../../../config/authmiddlewares/auth')
//here are all of the admin routes 
//to do make them 
const usermod = require('./usermod')

const health = require('./health');
const questionnaire_upd = require('./questionnaire_upd')
const reset_all = require('./resetall')
const resetq = require('./resetq')
const user =  require('./user')
const mypolls = require('./mypolls');
const changapassRequest = require('./giveMylicence')
const { randomBytes } = require('crypto');

router.use('/usermod',usermod);

router.use(authuser);
router.use('/health',health);
router.use('/questionnaire_upd',questionnaire_upd)
router.use('/resetall',reset_all);
router.use('/resetq',resetq) ;
router.use('/user',user);
router.use('/mypolls',mypolls);
router.use('/requestgangePass',changapassRequest)




module.exports = router ;
//complete vasi prodigrafies  ekfonisis