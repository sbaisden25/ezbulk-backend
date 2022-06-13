
const router = require('express').Router();
let Product = require('../models/product.model');


// Get all products
router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
});


// Add a product
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const caloriesPerServing = Number(req.body.caloriesPerServing);
  const proteinPerServing = Number(req.body.proteinPerServing);
  const totalFatPerServing = Number(req.body.totalFatPerServing);
  const carbsPerServing = Number(req.body.carbsPerServing);
  const servingsPerProduct = Number(req.body.servingsPerProduct);
  const img = req.body.img;
  const link = req.body.link;
  const tags = req.body.tags;

  const newProduct = new Product({
    name,
    price,
    caloriesPerServing,
    proteinPerServing,
    totalFatPerServing,
    carbsPerServing,
    servingsPerProduct,
    img,
    link,
    calsPerDol: -((caloriesPerServing * servingsPerProduct / price).toFixed()),
    protPerDol: -((proteinPerServing * servingsPerProduct / price).toFixed()),
    fatPerDol: -((totalFatPerServing * servingsPerProduct / price).toFixed()),
    carbPerDol: -((carbsPerServing * servingsPerProduct / price).toFixed()),
    tags

  });

  newProduct.save()
  .then(() => res.json('Product added!'))
});


// Get a product by id
router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
});


// Delete a product by id
router.route('/:id').delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product deleted.'))
});



// Get products sorted by sortBy and tag
router.route('/sort/:sortBy/tags/:tag').get((req, res) => {
  Product.find({tags: req.params.tag})
    .sort(req.params.sortBy)
    .then(products => res.json(products))
});

// Get products with a specific tag
router.route('/tags/:tag').get((req, res) => {
  Product.find({tags: req.params.tag})
    .then(products => res.json(products))
});

// Get products sorted by sortBy
router.route('/sort/:sortBy').get((req, res) => {
  Product.find()
    .sort(req.params.sortBy)
    .then(products => res.json(products))
});




module.exports = router;