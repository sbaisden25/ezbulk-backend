//CREATE OPERATION

router.post("",(req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
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

// READ OPERATION
router.get("/mypost", (req, res, next) => {
Post.find({creator: req.userData.userId}).then(post => {
  if (post) {
    res.status(200).json({
        message: "Posts fetched successfully!",
        posts: post
    });
  }
}).catch(e=>{
    console.log(e)
});
});

//UPDATE OPERATION
router.put(
"/:id",
(req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
     
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

