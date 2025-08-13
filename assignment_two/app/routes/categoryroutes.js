const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/categorycontroller');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

router.use(ensureAuthenticated);
router.get('/', categoryCtrl.list);
router.get('/add', allowRoles('Super Admin','Admin','User'), categoryCtrl.showForm);
router.post('/add', allowRoles('Super Admin','Admin','User'), categoryCtrl.save);
router.get('/edit/:id', allowRoles('Super Admin','Admin','User'), categoryCtrl.showForm);
router.post('/edit/:id', allowRoles('Super Admin','Admin','User'), categoryCtrl.update);
router.post('/delete/:id', allowRoles('Super Admin','Admin','User'), categoryCtrl.delete);
router.post('/:id/sub/add', allowRoles('Super Admin','Admin','User'), categoryCtrl.addSub);
router.post('/:id/sub/delete/:subid', allowRoles('Super Admin','Admin','User'), categoryCtrl.deleteSub);

router.post('/:id/subcategory/add', allowRoles('Super Admin','Admin','User'), categoryCtrl.addSub);
router.post('/:id/sub/delete/:subid', allowRoles('Super Admin','Admin','User'), categoryCtrl.deleteSub);

module.exports = router;
