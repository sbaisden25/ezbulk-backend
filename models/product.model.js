const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number},
  caloriesPerServing: { type: Number},
  proteinPerServing: { type: Number},
  totalFatPerServing: { type: Number},
  carbsPerServing: { type: Number},
  servingsPerProduct: { type: Number},
  img: { type: String},
  link: { type: String},
  calsPerDol: { type: Number},
  protPerDol: { type: Number},
  fatPerDol: { type: Number},
  carbPerDol: { type: Number},
  tags: { type: Array },
  content: { type: String}

}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;