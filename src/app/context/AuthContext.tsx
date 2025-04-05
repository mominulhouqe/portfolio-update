// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        
        try {
          // Set auth token header
          setAuthToken(token);
          
          // Get current user
          const res = await axios.get('/api/auth/me');
          
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          // Invalid token
          localStorage.removeItem('token');
          setAuthToken(null);
        }
      }
      
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Set auth token header
  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  // Login user
  const login = async (username, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ username, password });

    try {
      const res = await axios.post('/api/auth/login', body, config);
      
      // Set token in local storage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      setAuthToken(res.data.token);
      
      // Get user data
      const userRes = await axios.get('/api/auth/me');
      
      setUser(userRes.data);
      setIsAuthenticated(true);
      
      return true;
    } catch (err) {
      localStorage.removeItem('token');
      setAuthToken(null);
      setUser(null);
      setIsAuthenticated(false);
      
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
