const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({

    product_name: { type: String, required: true },
    product_price: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true }
}, { timestamps: true })
const ProductModel = mongoose.model('product', ProductSchema)
module.exports = ProductModel