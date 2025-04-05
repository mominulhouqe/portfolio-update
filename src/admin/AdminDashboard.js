// client/src/admin/AdminDashboard.js (continued)
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="admin-dashboard py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user && user.username}</h2>
          <p className="mb-6">Manage your blog from this dashboard.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              to="/admin/posts" 
              className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow-sm flex flex-col items-center justify-center"
            >
              <h3 className="text-lg font-semibold mb-2">Manage Blog Posts</h3>
              <p className="text-center text-gray-600">Add, edit, or delete your blog posts</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;