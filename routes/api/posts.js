
const router = require('express').Router();

// Load Post model
let Post = require('../../models/Post.js');



// Get all posts
router.route('/').get((req, res) => {
  Post.find()
    .then(posts => res.json(posts))
});


// Add a post
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const img = req.body.img;
  const link = req.body.link;
  const tags = req.body.tags;

  const newPost = new Post({
    title,
    content,

    img,
    link,
    tags

  });

  newPost.save()
  .then(() => res.json('Post added!'))
});


// Get a post by id
router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
});


// Delete a post by id
router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
});



// Get posts with a specific tag
router.route('/tags/:tag').get((req, res) => {
    Post.find({tags: req.params.tag})
    .then(posts => res.json(posts))
});




module.exports = router;