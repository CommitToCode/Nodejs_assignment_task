const express = require("express");
const { signup, verifyEmail, login } = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rishi Banerjee
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rishi2020.rp@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MyStrongPassword123
 *     responses:
 *       201:
 *         description: User registered successfully. Verification email sent.
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post("/signup", signup);

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Email verification token sent to the user's email
 *     responses:
 *       200:
 *         description: Email successfully verified
 *       400:
 *         description: Invalid or expired verification token
 *       500:
 *         description: Server error
 */
router.get("/verify", verifyEmail);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rishi2020.rp@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MyStrongPassword123
 *     responses:
 *       200:
 *         description: Login successful. Returns JWT token.
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", login);

module.exports = router;
