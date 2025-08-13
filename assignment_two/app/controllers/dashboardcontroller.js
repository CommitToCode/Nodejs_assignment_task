const Product = require('../models/product');
const Category = require('../models/category');

class DashboardController {
  async dashboard(req, res) {
    try {
    
      const breakdown = await Product.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'categoryDetails'
          }
        },
        {
          $unwind: {
            path: '$categoryDetails',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: '$categoryDetails.subcategories',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $group: {
            _id: {
              category: '$categoryDetails.name',
              sub: '$categoryDetails.subcategories.name'
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.category': 1, '_id.sub': 1 }
        }
      ]);

      
      const totalProducts = await Product.countDocuments();
      const totalCategories = await Category.countDocuments();
      const totalSubcategories = await Category.aggregate([
        { $unwind: '$subcategories' },
        { $count: 'totalSubcategories' }
      ]);

      res.render('dashboard', {
        layout: 'layout',
        totalProducts,
        totalCategories,
        totalSubcategories: totalSubcategories[0]?.totalSubcategories || 0,
        breakdown
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new DashboardController();
