
const router = require('express').Router();

// Load Stack model
let Stack = require('../../models/Stack.js');



// Get all stacks
router.route('/').get((req, res) => {
  Stack.find()
    .then(stacks => res.json(stacks))
});


// Add a stack
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const caloriesWholeStack = Number(req.body.caloriesWholeStack);
  const proteinWholeStack = Number(req.body.proteinWholeStack);
  const days = Number(req.body.days);
  const img = req.body.img;
  const link = req.body.link;
  const tags = req.body.tags;

  const newStack = new Stack({
    name,
    price,
    pricePerDay: (price / days).toFixed(2),
    caloriesWholeStack,
    calsPerDay: (caloriesWholeStack / days).toFixed(),
    proteinWholeStack,
    protPerDay: (proteinWholeStack / days).toFixed(),
    days,
    img,
    link,
    tags

  });

  newStack.save()
  .then(() => res.json('Stack added!'))
});


// Get a stack by id
router.route('/:id').get((req, res) => {
  Stack.findById(req.params.id)
    .then(stack => res.json(stack))
});


// Delete a stack by id
router.route('/:id').delete((req, res) => {
    Stack.findByIdAndDelete(req.params.id)
    .then(() => res.json('Stack deleted.'))
});



// Get stacks sorted by sortBy and tag
router.route('/sort/:sortBy/tags/:tag').get((req, res) => {
    Stack.find({tags: req.params.tag})
    .sort(req.params.sortBy)
    .then(stacks => res.json(stacks))
});

// Get stacks with a specific tag
router.route('/tags/:tag').get((req, res) => {
    Stack.find({tags: req.params.tag})
    .then(stacks => res.json(stacks))
});

// Get stacks sorted by sortBy
router.route('/sort/:sortBy').get((req, res) => {
  Stack.find()
    .sort(req.params.sortBy)
    .then(stacks => res.json(stacks))
});




module.exports = router;