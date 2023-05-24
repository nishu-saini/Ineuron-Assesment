// Fetch blogs from API and display them in the UI
function fetchBlogs() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        const blogList = document.getElementById('blogList');
        blogList.innerHTML = '';
  
        data.forEach(blog => {
          const blogItem = document.createElement('li');
          blogItem.className = 'blogItem';
          blogItem.innerHTML = `
            <h2>${blog.title}</h2>
            <p>${blog.body}</p>
            <button class="deleteBtn" onclick="deleteBlog(${blog.id})">Delete</button>
          `;
          blogList.appendChild(blogItem);
        });
      })
      .catch(error => {
        console.log('Error fetching blogs:', error);
    });
}
  
// Add a new blog
function addBlog() {
    const titleInput = document.getElementById('titleInput');
    const contentInput = document.getElementById('contentInput');
    const title = titleInput.value;
    const content = contentInput.value;
  
    if (title && content) {
      const newBlog = {
        title: title,
        body: content
      };
  
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBlog)
      })
        .then(response => response.json())
        .then(data => {
          console.log('New blog added:', data);
          titleInput.value = '';
          contentInput.value = '';
          fetchBlogs();
        })
        .catch(error => {
          console.log('Error adding blog:', error);
        });
    } else {
      alert('Please enter a title and content for the blog.');
    }
}
  
// Delete a blog
function deleteBlog(blogId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log(`Blog ${blogId} deleted.`);
          fetchBlogs();
        } else {
          console.log(`Error deleting blog ${blogId}.`);
        }
    })
      .catch(error => {
        console.log('Error deleting blog:', error);
    });
}
  
// Fetch blogs on page load
fetchBlogs();

// Add event listener for the "Add Blog" button
document.getElementById('addBtn').addEventListener('click', addBlog);