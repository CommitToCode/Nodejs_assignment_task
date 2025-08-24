const express = require('express');
const CategoryController = require('../controller/CategoryController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management APIs
 */

/**
 * @swagger
 * /api/create/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               slug:
 *                 type: string
 *                 example: electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/create/category', CategoryController.createcategory);

/**
 * @swagger
 * /api/categorylist:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   slug:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/categorylist', CategoryController.categorylist);

/**
 * @swagger
 * /api/product/category/{slug}:
 *   get:
 *     summary: Get single category by slug
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Category slug
 *         example: electronics
 *     responses:
 *       200:
 *         description: Category details with products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *       404:
 *         description: Category not found
 */
router.get('/product/category/:slug', CategoryController.singlecategory);

module.exports = router;
