const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String},
  content: { type: String},
  img: { type: String},
  link: { type: String},
  tags: { type: Array}
  
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;