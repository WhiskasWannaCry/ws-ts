const {Posts,Users}  = require('./schemas');

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

// Need more logic
app.post('/sign_up_user', async (req, res) => {
  const { username, email, password, image } = req.body;
  if (!username || !email || !password) {
    res.status(500).json({ success:false, message: 'Incorrect fields!' });
  } else {
    try {
      let foundUser = await Users.findOne({email})
      if(!foundUser) {
        const newUser = { username, email, password, image };
        await Users.create(newUser)
        foundUser = await Users.findOne({email})
        res.send({success:true, message:"User succesfull registered!",foundUser})
      } else {
        res.send({ success:false, message: 'User with this e-mail already signed up' });
      }
      console.log(foundUser)
    } catch (error) {
      console.error(error);
      res.status(500).json({ success:false, message: 'Server error (sign up)' });
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
      res.status(404).json({ success:false, message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: 'Server error (new comment)' });
  }
});
