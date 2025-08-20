const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const { addMovie, listMovies, editMovie, deleteMovie } = require('../controllers/moviecontroller');

router.post('/', auth, requireRole('Admin'), addMovie);       
router.get('/', auth, listMovies);                           
router.put('/:id', auth, requireRole('Admin'), editMovie);    
router.delete('/:id', auth, requireRole('Admin'), deleteMovie); 

module.exports = router;
