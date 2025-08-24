const express = require('express')
const ProductController = require('../controller/ProductController')
const { Authcheck } = require('../middleware/Authcheck')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /api/create/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/create/product', ProductController.createproduct)

/**
 * @swagger
 * /api/productlist:
 *   get:
 *     summary: Get list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/productlist', ProductController.productlist)

/**
 * @swagger
 * /api/productmatch:
 *   get:
 *     summary: Search products by query
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for matching products
 *     responses:
 *       200:
 *         description: Matching products
 */
router.get('/productmatch', ProductController.productmatch)

/**
 * @swagger
 * /api/editproduct/{id}:
 *   get:
 *     summary: Get a product by ID for editing
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/editproduct/:id', ProductController.editproduct)

/**
 * @swagger
 * /api/updateproduct/{id}:
 *   post:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.post('/updateproduct/:id', ProductController.updateprouct)

/**
 * @swagger
 * /api/deleteproduct/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/deleteproduct/:id', ProductController.deleteproduct)

module.exports = router
