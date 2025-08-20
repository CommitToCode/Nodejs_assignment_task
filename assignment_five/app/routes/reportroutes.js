const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const {
  moviesWithTotalBookings,
  bookingsByTheater,
  emailMyBookingSummary
} = require('../controllers/reportcontroller');

router.get('/movies-bookings', auth, requireRole('Admin'), moviesWithTotalBookings); // 1. Movies with total bookings
router.get('/bookings-by-theater', auth, requireRole('Admin'), bookingsByTheater);   // 2. Bookings grouped by theater/show
router.post('/email-summary', auth, emailMyBookingSummary);                           // 3. Send booking summary to user email

module.exports = router;
