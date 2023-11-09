const { Posts, Users } = require('./schemas');
const authRouter = require('./authRouter');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to MongoDB');
} catch (e) {
  console.log('Error on mongoose connection: ', e);
}

app.use(cors());
app.use(express.json());

// Function to serve all static files
// inside public directory.
app.use(
  '/posts_images',
  express.static('C:/TypeScriptProjects/ws-ts/backend/posts_images'),
);
app.use(
  '/users_images',
  express.static('C:/TypeScriptProjects/ws-ts/backend/users_images'),
);

app.listen(process.env.PORT, () => {
  console.log(`EXPRESS SERVER listening on port ${process.env.PORT}`);
});

// Get all posts from Posts Collection
// Send array of posts objects
app.get('/get_posts', async (req, res) => {
  const posts = await Posts.find({}).lean();
  const newPosts = posts.map((post) => ({
    ...post,
    likes: post.likes.length,
  }));
  res.send(newPosts);
});

app.use('/auth', authRouter);

app.get('/validation_current_user', (req, res) => {
  const userForValidation = req.query;
  try {
    var decoded = jwt.verify(
      userForValidation.token,
      process.env.JWT_SECRET_KEY,
    );
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      // Обработка истекшего токена
      console.log(err);
      res.json({ success: false, message: 'Token expired' });
    }
  }
});

app.post('/add_new_comment', async (req, res) => {
  const { postID, comment } = req.body;
  try {
    const post = await Posts.findOne({ _id: postID });
    if (post) {
      post.comments.push(comment);
      const postDocument = new Posts(post);
      await postDocument.save();
      res.send(post.comments);
    } else {
      res.json({ success: false, message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res
      .json({ success: false, message: 'Server error (new comment)' });
  }
});

app.post('/add_or_remove_like', async (req, res) => {
  const { userLSID, postID } = req.body;
  try {
    let post = await Posts.findById(postID);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    const userLikedPost = post.likes.findIndex(likerID => likerID === userLSID);
    if (userLikedPost === -1) {
      post.likes.push(userLSID);
    } else {
      post.likes.splice(userLikedPost, 1);
      likeStatus = false;
    }
    await post.save();
    res.json({ success: true, post });
  } catch (error) {
    console.error(error);
    res
      .json({ success: false, message: 'Server error (add or remove like)' });
  }
});
