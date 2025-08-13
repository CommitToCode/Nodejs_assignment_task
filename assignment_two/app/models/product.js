const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  categoryId: mongoose.Schema.Types.ObjectId,
  subcategoryName: String
});
module.exports = mongoose.model('Productt', productSchema);
