const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productcontroller');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

router.use(ensureAuthenticated);
router.get('/', productCtrl.list);
router.get('/add', allowRoles('Super Admin','User'), productCtrl.showForm);
router.post('/add', allowRoles('Super Admin','User'), productCtrl.save);
router.get('/edit/:id', allowRoles('Super Admin','User'), productCtrl.edit);
router.post('/edit/:id', allowRoles('Super Admin','User'), productCtrl.update);
router.post('/delete/:id', allowRoles('Super Admin','User'), productCtrl.delete);

module.exports = router;
