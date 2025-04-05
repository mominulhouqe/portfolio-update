
// client/src/admin/AdminBlogForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    link: '#',
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { title, text, link } = formData;
  
  // Fetch blog post data if in edit mode
  useEffect(() => {
    const fetchPost = async () => {
      if (isEditMode) {
        try {
          const res = await axios.get(`/api/blog/${id}`);
          setFormData({
            title: res.data.title,
            text: res.data.text,
            link: res.data.link || '#',
          });
          setPreviewImage(res.data.img.startsWith('http') ? res.data.img : `http://localhost:5000${res.data.img}`);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch blog post');
          setLoading(false);
          console.error(err);
        }
      }
    };
    
    fetchPost();
  }, [id, isEditMode]);
  
  // Handle form input changes
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // Handle image file selection
  const onImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  
  // Submit form handler
  const onSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    // Create form data object
    const postData = new FormData();
    postData.append('title', title);
    postData.append('text', text);
    postData.append('link', link);
    
    if (image) {
      postData.append('img', image);
    }
    
    try {
      if (isEditMode) {
        // Update existing post
        await axios.put(`/api/blog/${id}`, postData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        setSuccess('Blog post updated successfully');
      } else {
        // Create new post
        await axios.post('/api/blog', postData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        setSuccess('Blog post created successfully');
        
        // Clear form data for new post
        setFormData({
          title: '',
          text: '',
          link: '#',
        });
        setImage(null);
        setPreviewImage('');
      }
      
      // Redirect after short delay
      setTimeout(() => {
        navigate('/admin/posts');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to save blog post');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return <div className="container py-10">Loading...</div>;
  }
  
  return (
    <div className="admin-blog-form py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="text"
              name="text"
              value={text}
              onChange={onChange}
              rows="6"
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
              Link (optional)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="link"
              type="text"
              name="link"
              value={link}
              onChange={onChange}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              name="image"
              onChange={onImageChange}
              accept=".jpg,.jpeg,.png,.webp"
              required={!isEditMode}
            />
            {previewImage && (
              <div className="mt-2">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="h-32 object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : (isEditMode ? 'Update Post' : 'Create Post')}
            </button>
            <Link
              to="/admin/posts"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogForm;
