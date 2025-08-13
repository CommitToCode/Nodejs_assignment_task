const Category = require('../models/category');

class CategoryController {
  async list(req, res) {
    const cats = await Category.aggregate([{ $project: { name: 1, subcategories: 1 } }]);
    res.render('categories/list', { categories: cats });
  }

  showForm(req, res) {
    res.render('categories/form', { cat: {} });
  }

  async save(req, res) {
    const { name } = req.body;
    await new Category({ name, subcategories: [] }).save();
    res.redirect('/categories');
  }

  async update(req, res) {
    const { name } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { name });
    res.redirect('/categories');
  }

  async delete(req, res) {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/categories');
  }

  async addSub(req, res) {
    const { subname } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { $push: { subcategories: { name: subname } } });
    res.redirect('/categories');
  }

  async deleteSub(req, res) {
    await Category.findByIdAndUpdate(req.params.id, { $pull: { subcategories: { _id: req.params.subid } } });
    res.redirect('/categories');
  }
}

module.exports = new CategoryController();
