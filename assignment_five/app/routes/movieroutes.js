const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const { addMovie, listMovies, editMovie, deleteMovie } = require('../controllers/moviecontroller');

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Movies]
 *     summary: Add a new movie (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               duration: { type: string }
 *               releaseDate: { type: string, format: date }
 *             required:
 *               - title
 *               - description
 *     responses:
 *       201:
 *         description: Movie added
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.post('/', auth, requireRole('Admin'), addMovie);

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Movies]
 *     summary: Get list of all movies
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of movies
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, listMovies);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags: [Movies]
 *     summary: Edit a movie (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               duration: { type: string }
 *               releaseDate: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Movie updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.put('/:id', auth, requireRole('Admin'), editMovie);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags: [Movies]
 *     summary: Delete a movie (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.delete('/:id', auth, requireRole('Admin'), deleteMovie);

module.exports = router;
