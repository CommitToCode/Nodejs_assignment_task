const category = require('../models/category');
const Category = require('../models/category');
const question = require('../models/question');

class CategoryController {
  
  async create(req, res) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }


  async list(req, res) {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'categories',
          as: 'qs'
        }
      },
      {
        $project: {
          name: 1,
          totalQuestions: { $size: '$qs' }
        }
      }
    ]);
    res.json(categories);
  }

    async getcategory(req, res) {
    try {
      const categories = await Category.find({}, 'name'); 
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}



module.exports = new CategoryController();
