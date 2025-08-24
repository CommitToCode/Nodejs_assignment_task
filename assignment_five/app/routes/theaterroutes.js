const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const { addTheater, assignMovie } = require('../controllers/theatercontroller');

/**
 * @swagger
 * tags:
 *   name: Theaters
 *   description: Theater management routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Theaters]
 *     summary: Add a new theater (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               location: { type: string }
 *               totalScreens: { type: number }
 *             required:
 *               - name
 *               - location
 *               - totalScreens
 *     responses:
 *       201:
 *         description: Theater added
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.post('/', auth, requireRole('Admin'), addTheater);

/**
 * @swagger
 * /{theaterId}/assign:
 *   post:
 *     tags: [Theaters]
 *     summary: Assign movies to a theater (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: theaterId
 *         required: true
 *         schema:
 *           type: string
 *         description: Theater ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId: { type: string }
 *               screen: { type: string }
 *               timings: 
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - movieId
 *               - screen
 *               - timings
 *     responses:
 *       200:
 *         description: Movie assigned to theater
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.post('/:theaterId/assign', auth, requireRole('Admin'), assignMovie);

module.exports = router;
