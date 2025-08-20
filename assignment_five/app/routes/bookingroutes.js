const router = require('express').Router();
const auth = require('../middleware/auth');
const { getTheatersForMovie, bookTickets, cancelBooking, myBookings } = require('../controllers/bookingcontroller');

router.get('/movies/:movieId/theaters', auth, getTheatersForMovie);  
router.post('/', auth, bookTickets);                                 
router.post('/:id/cancel', auth, cancelBooking);                      
router.get('/my', auth, myBookings);                                 

module.exports = router;
