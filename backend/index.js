const Posts = require('./schemas')

require('dotenv').config();

const express = require('express')
const app = express()

const cors = require('cors');

const mongoose = require('mongoose')

try {
  mongoose.connect(process.env.MONGO_URL)
  console.log("Connected to MongoDB")
} catch(e) {
  console.log("Error on mongoose connection: ",e)
};

app.use(cors())

// Function to serve all static files
// inside public directory.
app.use('/posts_images', express.static('C:/TypeScriptProjects/ws-ts/backend/posts_images'));
app.use('/users_images', express.static('C:/TypeScriptProjects/ws-ts/backend/users_images'));

app.listen(process.env.PORT, () => {
  console.log(`EXPRESS SERVER listening on port ${process.env.PORT}`)
})

// Get all posts from Posts Collection
// Send array of posts objects
app.get('/get_posts', async (req, res) => {
  const posts = await Posts.find({})
  console.log(posts)
  res.send(posts)
})