const express = require("express");
const { signup, verifyEmail, login } = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags: [Auth]
 *     summary: User signup with email verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Signup successful, verification email sent
 */
router.post("/signup", signup);

/**
 * @swagger
 * /verify:
 *   get:
 *     tags: [Auth]
 *     summary: Verify user email
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token sent via email
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.get("/verify", verifyEmail);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful, returns token
 */
router.post("/login", login);

module.exports = router;
