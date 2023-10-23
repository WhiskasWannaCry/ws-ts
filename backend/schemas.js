const { Schema,mongoose } = require('mongoose');

const post = new Schema({
  whoPostedID: String,
  text: String,
  likes: Number,
});

const Posts = mongoose.model('posts', post);

module.exports = Posts