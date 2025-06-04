import React, { useState, useEffect } from "react";
import axios from "axios";
import "./blog.css";

const Blog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5001/api/blogs");
        setBlogs(response.data);
      } catch (err) {
        setError("Failed to fetch blogs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Limit image size to 1MB
      if (file.size > 1024 * 1024) {
        setError("Image size must be under 1MB");
        setImage(null);
        setPreview("");
        return;
      }

      setError("");
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to publish a post");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5001/api/blogs",
        {
          title,
          content,
          image: preview, // base64 image string or empty
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs([response.data, ...blogs]);
      setTitle("");
      setContent("");
      setImage(null);
      setPreview("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create blog post"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to delete a post");
        return;
      }
      await axios.delete(`http://localhost:5001/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete blog post"
      );
      console.error(err);
    }
  };

  return (
    <div className="blog-page-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="blog-form">
          <h2>Create a New Blog Post</h2>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="Write your blog content here..."
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Featured Image (Max 1MB)</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
            />
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>

      <div className="posts-container">
        <h2>Published Posts</h2>
        {loading && blogs.length === 0 ? (
          <div className="loading">Loading posts...</div>
        ) : blogs.length === 0 ? (
          <p className="no-posts">No posts yet. Create your first blog post!</p>
        ) : (
          <div className="blog-posts">
            {blogs.map((blog) => (
              <article key={blog._id} className="blog-post">
                {blog.image && (
                  <div className="post-image">
                    <img src={blog.image} alt={blog.title} />
                  </div>
                )}
                <div className="post-content">
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                  <div className="post-meta">
                    <span className="author">
                      {blog.author?.name || "Unknown author"}
                    </span>
                    <time dateTime={blog.createdAt}>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="delete-btn"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
