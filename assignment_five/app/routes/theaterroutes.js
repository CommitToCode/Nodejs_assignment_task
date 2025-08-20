const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const { addTheater, assignMovie } = require('../controllers/theatercontroller');

router.post('/', auth, requireRole('Admin'), addTheater);                     
router.post('/:theaterId/assign', auth, requireRole('Admin'), assignMovie);  // (Admin) 3. Assign Movies to Theaters (screens & timings)

module.exports = router;
