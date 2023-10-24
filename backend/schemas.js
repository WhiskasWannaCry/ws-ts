const { Schema,mongoose } = require('mongoose');

const post = new Schema({
  whoPostedID: String,
  text: String,
  likes: [String],
  image: String,
  subscribesIds: [String],
});

const user = new Schema({
  name: String,
  age: String,
  title: String,
  image: String,
});

const Posts = mongoose.model('posts', post);

module.exports = Posts