
const router = require('express').Router(); 
const { register, login, verifyEmail } = require('../controllers/authcontroller'); 
const upload=require('../middlewares/upload')




/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: 
 *       400:
 *         description: 
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 
 *       400:
 *         description: 
 */

/**
 * @swagger
 * /auth/verify/{token}:
 *   get:
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 
 *       400:
 *         description: 
 */
router.post('/register', upload.single('image'), register);
router.post('/login', upload.single('image'), login);
router.get('/verify/:token', verifyEmail);

module.exports = router;
