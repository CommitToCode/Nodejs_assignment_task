const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getProfile, updateProfile } = require('../controllers/usercontroller');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile routes
 */

/**
 * @swagger
 * /me:
 *   get:
 *     tags: [Users]
 *     summary: Get profile of the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/me', auth, getProfile);

/**
 * @swagger
 * /me:
 *   put:
 *     tags: [Users]
 *     summary: Update profile of the logged-in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               profileImage: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: User profile updated
 *       401:
 *         description: Unauthorized
 */
router.put('/me', auth, upload.single('profileImage'), updateProfile);

module.exports = router;
