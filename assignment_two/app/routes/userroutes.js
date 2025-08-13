const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
router.get('/add',  userCtrl.showUserForm);
router.post('/add', userCtrl.saveUser);
router.use(ensureAuthenticated);
router.get('/list', allowRoles('Super Admin', 'Admin'), userCtrl.listUsers);
router.get('/edit/:id', allowRoles('Super Admin', 'Admin'), userCtrl.editUser);
router.post('/edit/:id', allowRoles('Super Admin', 'Admin'), userCtrl.updateUser);
router.post('/delete/:id', allowRoles('Super Admin', 'Admin'), userCtrl.deleteUser);

module.exports = router;
