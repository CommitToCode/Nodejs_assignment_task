const express=require('express')
const ProductController = require('../controller/ProductController')
const { Authcheck } = require('../middleware/Authcheck')
const router=express.Router()


router.post('/create/product',ProductController.createproduct)
router.get('/productlist',ProductController.productlist)
router.get('/productmatch',ProductController.productmatch)
router.get('/editproduct/:id',ProductController.editproduct)
router.post('/updateproduct/:id',ProductController.updateprouct)
router.delete('/deleteproduct/:id',ProductController.deleteproduct)


module.exports=router