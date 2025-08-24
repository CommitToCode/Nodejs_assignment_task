const express=require('express')
const AuthController = require('../controller/AuthController')
const { Authcheck } = require('../middleware/Authcheck')
const userimageupload = require('../helper/userimageupload')
const router=express.Router()

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
 */
router.post('/register',userimageupload.single('image'),AuthController.register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 
 */
router.post('/login',AuthController.login)

/**
 * @swagger
 * /auth/verifyotp:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: 
 */
router.post('/verifyotp',AuthController.verifyotp)

/**
 * @swagger
 * /auth/resendotp:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 
 */
router.post('/resendotp',AuthController.resendotp)

/**
 * @swagger
 * /auth/user/profile:
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
router.get('/user/profile',Authcheck,AuthController.profile)

/**
 * @swagger
 * /auth/Editprofile/{id}:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 
 *       401:
 *         description: 
 */
router.get('/Editprofile/:id',Authcheck,AuthController.editprofile)

/**
 * @swagger
 * /auth/updateprofile/{id}:
 *   post:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
router.post('/updateprofile/:id',Authcheck,userimageupload.single('image'),AuthController.updateprofile)

/**
 * @swagger
 * /auth/deleteprofile/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 
 *       401:
 *         description: 
 */
router.delete('/deleteprofile/:id',Authcheck,AuthController.deleteprofile)

/**
 * @swagger
 * /auth/sendlist:
 *   post:
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
router.post('/sendlist',Authcheck,AuthController.sendProductListEmail)

module.exports=router
