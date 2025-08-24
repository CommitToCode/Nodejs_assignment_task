const express = require('express');
const router = express.Router();
const { editProfile, getProfile, listUsers } = require('../controllers/usercontroller');
const { protect } = require('../middleware/authmiddleware');
const { adminOnly } = require('../middleware/rolemiddleware');
const upload = require('../middleware/uploadimage');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and management routes
 */

/**
 * @swagger
 * /me:
 *   get:
 *     tags: [Users]
 *     summary: Get current user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */
router.get('/me', protect, getProfile);

/**
 * @swagger
 * /me:
 *   put:
 *     tags: [Users]
 *     summary: Update current user's profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_pics:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 */
router.put('/me', protect, upload.single('profile_pics'), editProfile);

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Users]
 *     summary: List all users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', protect, adminOnly, listUsers);

module.exports = router;
