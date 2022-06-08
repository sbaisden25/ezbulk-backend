const router = require('express').Router();
let Post = require('../models/post.model');


// Get all posts
router.route('/posts').get((req, res) => {
    Post.find()
      .then(posts => res.json(posts))
  });

  // Get posts with a specific tag
router.route('/posts/:tag').get((req, res) => {
    Post.find({tags: req.params.tag})
      .then(posts => res.json(posts))
  });


// add post
router.post("",(req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        img: req.body.img
    })
    post.save().
        then(post => {
            if(post){
                res.status(201).json({
                    message: "Post added successfully",
                    post: {
                        ...post,
                        id: post._id
                    }
                })
            }
    }).catch(e => {
            console.log(e)
        })
})
  
  
// update post
router.put(
"/:id",
(req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        img: req.body.img
     
    });
    Post.updateOne(
        { _id: req.params.id},
        post
      ).then(result => {
        if(result){
            res.status(200).json({ message: "Update successful!" });
        }       
        else {
            res.status(500).json({ message: "Error Upating Post" });
        }
    });
}
);
