const Product = require('../models/product');
const Category = require('../models/category');

class ProductController {
  async list(req, res) {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'cat'
        }
      },
      { $unwind: '$cat' },
      {
        $project: {
          name: 1,
          price: 1,
          categoryName: '$cat.name',
          subcategoryName: 1
        }
      }
    ]);
    res.render('products/list', { products });
  }

  async showForm(req, res) {
    const categories = await Category.find().lean();
    res.render('products/form', { product: {}, categories });
  }

  async save(req, res) {
    const { name, price, categoryId, subcategoryName } = req.body;
    await new Product({ name, price, categoryId, subcategoryName }).save();
    res.redirect('/products');
  }

  async update(req, res) {
    const { name, price, categoryId, subcategoryName } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price, categoryId, subcategoryName });
    res.redirect('/products');
  }

  async edit(req, res) {
    const product = await Product.findById(req.params.id).lean();
    const categories = await Category.find().lean();
    const products = await Product.find().lean(); 
    res.render('products/form', { product, categories, products });
  }

  async delete(req, res) {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  }
}

module.exports = new ProductController();
