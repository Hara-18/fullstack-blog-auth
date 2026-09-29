import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [username, setUsername] = useState('');

  // Fetch all posts on load
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // Handle form submission to create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/posts', {
        title,
        desc,
        username,
      });
      // Clear form and refresh posts list
      setTitle('');
      setDesc('');
      setUsername('');
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "800px", margin: "auto" }}>
      <h1>MERN Stack Blog App</h1>
      <p style={{ color: "green" }}>Frontend connected to backend successfully!</p>

      {/* Create Post Form */}
      <div style={{ background: "#222", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
        <h3>Create a New Blog Post</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <textarea 
            placeholder="Tell your story..." 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)} 
            required 
            rows="4"
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input 
            type="text" 
            placeholder="Your Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button type="submit" style={{ padding: "10px", background: "#4f46e5", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Publish Post
          </button>
        </form>
      </div>

      <h2>Saved Blog Posts from Database:</h2>
      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid #444", padding: "15px", margin: "10px 0", borderRadius: "5px", background: "#1a1a1a" }}>
          <h3>{post.title}</h3>
          <p>{post.desc}</p>
          <small style={{ color: "#aaa" }}>Author: {post.username}</small>
        </div>
      ))}
    </div>
  );
}

export default App;