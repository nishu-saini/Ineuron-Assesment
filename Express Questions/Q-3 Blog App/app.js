const express = require('express');
const app = express();

app.use(express.json());

// Sample initial data
let blogs = [
  { id: 1, title: 'Blog 1', content: 'Lorem ipsum dolor sit amet.' },
  { id: 2, title: 'Blog 2', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

// Get all blogs
app.get('/blogs', (req, res) => {
  res.json(blogs);
});

// Get a specific blog by ID
app.get('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blog = blogs.find(blog => blog.id === id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

// Create a new blog
app.post('/blogs', (req, res) => {
  const { id, title, content } = req.body;
  const newBlog = { id, title, content };

  blogs.push(newBlog);
  res.status(201).json(newBlog);
});

// Update an existing blog by ID
app.put('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const blog = blogs.find(blog => blog.id === id);

  if (blog) {
    blog.title = title;
    blog.content = content;
    res.json(blog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

// Replace an existing blog by ID
app.patch('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const blogIndex = blogs.findIndex(blog => blog.id === id);

  if (blogIndex !== -1) {
    blogs[blogIndex] = { id, title, content };
    res.json(blogs[blogIndex]);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

// Delete a blog by ID
app.delete('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blogIndex = blogs.findIndex(blog => blog.id === id);

  if (blogIndex !== -1) {
    const deletedBlog = blogs.splice(blogIndex, 1);
    res.json(deletedBlog[0]);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

module.exports = app;