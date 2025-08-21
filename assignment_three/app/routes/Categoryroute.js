const express=require('express')
const CategoryController = require('../controller/CategoryController')
const { Authcheck } = require('../middleware/Authcheck')
const router=express.Router()

router.post('/create/category',CategoryController.createcategory)
router.get('/categorylist',CategoryController.categorylist)
router.get('/product/category/:slug',CategoryController.singlecategory)

module.exports=router