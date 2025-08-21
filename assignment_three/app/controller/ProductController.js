const ProductModel = require('../model/productmodel')
class ProductController {
    async createproduct(req, res) {
        console.log(req.body);

        try {
            const { product_name, product_price, category, stock } = req.body
            const pdata = await new ProductModel({
                product_name, product_price, category, stock
            }).save()
            return res.status(201).json({
                status: true,
                message: "Product Added Successfully",
                data: pdata
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message

            })
        }
    }
    async productlist(req, res) {
        try {
            const Product = await ProductModel.find()
            return res.status(200).json({
                status: true,
                message: "Product List Fetched Successfully",
                total: Product.length,
                data: Product
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }
    async productmatch(req, res) {
        try {

            const Product = await ProductModel.aggregate([{ $match: { stock: { $lt: 1 } } }])
            return res.status(200).json({
                status: true,
                message: "Product List Fetched Successfully",
                total: Product.length,
                data: Product
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }

    async editproduct(req, res) {
        try {
            const id = req.params.id
            const editproduct = await ProductModel.findById(id)
            return res.status(200).json({
                status: true,
                message: 'Single Product Fetched Successfully',
                data: editproduct
            })

        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }
    async updateprouct(req, res) {
        try {
            const id = req.params.id

            const updatedata = await ProductModel.findByIdAndUpdate(id, req.body, {
                new: true
            })
            return res.status(200).json({
                status: true,
                message: 'Product updated Successfully',
                data: updatedata
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }
    async deleteproduct(req, res) {
        try {
            const id = req.params.id
            const deleteproduct = await ProductModel.findByIdAndDelete(id)
            return res.status(200).json({
                status: true,
                message: 'Product Deleted Successfully'
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }
}

module.exports = new ProductController()