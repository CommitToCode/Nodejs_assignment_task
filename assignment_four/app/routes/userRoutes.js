const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");
const { AuthCheck } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
 *       401:
 *         description: Unauthorized
 */
router.get("/me", AuthCheck, getProfile);

/**
 * @swagger
 * /user/me:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Rishi Banerjee"
 *               email:
 *                 type: string
 *                 example: "rishi2020.rp@gmail.com"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/me", AuthCheck, updateProfile);

module.exports = router;
