const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name: { type: String,  },
  subcategories: [{ name: String }]
});
module.exports = mongoose.model('Category', categorySchema);
