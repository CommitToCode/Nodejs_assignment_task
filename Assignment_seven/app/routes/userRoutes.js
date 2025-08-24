const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");
const { AuthCheck } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile management routes
 */

/**
 * @swagger
 * /me:
 *   get:
 *     tags: [Users]
 *     summary: Get logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/me", AuthCheck, getProfile);

/**
 * @swagger
 * /me:
 *   put:
 *     tags: [Users]
 *     summary: Update logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put("/me", AuthCheck, updateProfile);

module.exports = router;
