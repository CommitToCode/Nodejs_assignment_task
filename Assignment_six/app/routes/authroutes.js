const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

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
 *     summary: Register a new user
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
 *         description: User registered
 *       400:
 *         description: Bad request
 */
router.post('/signup', AuthController.signup);

/**
 * @swagger
 * /verify-email:
 *   post:
 *     tags: [Auth]
 *     summary: Verify user email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               otp: { type: string }
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       200:
 *         description: Email verified
 *       400:
 *         description: Bad request
 */
router.post('/verify-email', AuthController.verifyEmail);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
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
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', AuthController.login);

module.exports = router;
