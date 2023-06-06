const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = 4000;
const DB_URI = 'mongodb://localhost:27017/blog_app';

app.use(express.json());

// Connect to MongoDB
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( data => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
} );

// Create a schema for the Post model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Create a Post model
const Post = mongoose.model('Post', postSchema);

// Endpoint to get 20 posts
app.get('/posts', (req, res) => {
  Post.find({}, null, { limit: 20 }, (err, posts) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(posts);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
