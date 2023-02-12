
        const {Router} = require('express');
        const router = Router() ;
        const {DeleteMatehodresetq} = require('../../../controllers/admins/resetq.js')
        router.route('/:resetq_id').delete(DeleteMatehodresetq);
        module.exports = router ;
        