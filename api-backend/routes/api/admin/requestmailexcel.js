
const {Router} = require('express');
const router = Router() ;
const {PostMatehodrequestmailexcel} = require('../../../controllers/admins/requestmailexcel.js')
router.route('/').post(PostMatehodrequestmailexcel)

module.exports = router ;
