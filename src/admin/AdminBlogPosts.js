// client/src/admin/AdminBlogPosts.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  // Fetch all blog posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/blog');
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blog posts');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete a blog post
  const deletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/blog/${id}`);
        setDeleteMessage('Post deleted successfully');
        
        // Refresh posts list
        fetchPosts();
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setDeleteMessage('');
        }, 3000);
      } catch (err) {
        setError('Failed to delete post');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="container py-10">Loading...</div>;
  }

  return (
    <div className="admin-blog-posts py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
          <Link 
            to="/admin/posts/new" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Post
          </Link>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {deleteMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {deleteMessage}
          </div>
        )}
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No blog posts found. Create your first post!
                  </td>
                </tr>
              ) : (
                posts.map(post => (
                  <tr key={post._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={post.img.startsWith('http') ? post.img : `http://localhost:5000${post.img}`} 
                        alt={post.title} 
                        className="h-10 w-10 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(post.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        to={`/admin/posts/edit/${post._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deletePost(post._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6">
          <Link 
            to="/admin" 
            className="text-blue-600 hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPosts;