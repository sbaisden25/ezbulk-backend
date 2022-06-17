const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stackSchema = new Schema({
  name: { type: String},
  price: { type: Number},
  pricePerDay: { type: Number},
  caloriesWholeStack: { type: Number},
  calsPerDay: { type: Number},
  proteinWholeStack: { type: Number},
  protPerDay: { type: Number},
  days: { type: Number},
  img: { type: String},
  link: { type: String},
  tags: { type: Array }

}, {
  timestamps: true,
});

const Stack = mongoose.model('Stack', stackSchema);

module.exports = Stack;