

const express = require('express'); 
const router = express.Router(); const auth = require('../middlewares/authmiddleware');
 const upload = require('../middlewares/upload');
 const { getProfile, updateProfile } = require('../controllers/usercontroller');






/**
 * @swagger
 * /users/profile:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 
 *       401:
 *         description: 
 */

/**
 * @swagger
 * /users/profile:
 *   put:
 *     tags:
 *       - Users
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
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 
 *       400:
 *         description: 
 *       401:
 *         description: 
 */
router.get('/profile', auth, getProfile);
router.put('/profile', auth, upload.single('image'), updateProfile);

module.exports = router;
