const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  caloriesPerServing: { type: Number, required: true },
  proteinPerServing: { type: Number, required: true },
  totalFatPerServing: { type: Number, required: true },
  carbsPerServing: { type: Number, required: true },
  servingsPerProduct: { type: Number, required: true },
  img: { type: String, required: true },
  link: { type: String, required: true },
  calsPerDol: { type: Number},
  protPerDol: { type: Number},
  fatPerDol: { type: Number},
  carbPerDol: { type: Number},
  tags: { type: Array }

}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;