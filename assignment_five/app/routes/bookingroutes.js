const router = require('express').Router();
const auth = require('../middleware/auth');
const { getTheatersForMovie, bookTickets, cancelBooking, myBookings } = require('../controllers/bookingcontroller');

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Movie booking routes
 */

/**
 * @swagger
 * /movies/{movieId}/theaters:
 *   get:
 *     tags: [Booking]
 *     summary: Get all theaters showing a specific movie
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: List of theaters
 *       401:
 *         description: Unauthorized
 */
router.get('/movies/:movieId/theaters', auth, getTheatersForMovie);

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Booking]
 *     summary: Book tickets for a movie
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId: { type: string }
 *               theaterId: { type: string }
 *               seats: 
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - movieId
 *               - theaterId
 *               - seats
 *     responses:
 *       201:
 *         description: Tickets booked
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, bookTickets);

/**
 * @swagger
 * /{id}/cancel:
 *   post:
 *     tags: [Booking]
 *     summary: Cancel a booked ticket
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/cancel', auth, cancelBooking);

/**
 * @swagger
 * /my:
 *   get:
 *     tags: [Booking]
 *     summary: Get all bookings of the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 *       401:
 *         description: Unauthorized
 */
router.get('/my', auth, myBookings);

module.exports = router;
