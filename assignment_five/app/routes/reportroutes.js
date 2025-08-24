const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const {
  moviesWithTotalBookings,
  bookingsByTheater,
  emailMyBookingSummary
} = require('../controllers/reportcontroller');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Reporting routes for admin and users
 */

/**
 * @swagger
 * /movies-bookings:
 *   get:
 *     tags: [Reports]
 *     summary: Get movies with total bookings (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of movies with total bookings
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.get('/movies-bookings', auth, requireRole('Admin'), moviesWithTotalBookings);

/**
 * @swagger
 * /bookings-by-theater:
 *   get:
 *     tags: [Reports]
 *     summary: Get bookings grouped by theater/show (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings grouped by theater/show
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.get('/bookings-by-theater', auth, requireRole('Admin'), bookingsByTheater);

/**
 * @swagger
 * /email-summary:
 *   post:
 *     tags: [Reports]
 *     summary: Send booking summary to user email
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email to send summary
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/email-summary', auth, emailMyBookingSummary);

module.exports = router;
