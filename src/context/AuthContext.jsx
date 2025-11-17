import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// ✅ Helper function to normalize user data
const normalizeUserData = (userData) => {
  if (!userData) return null;
  
  return {
    ...userData,
    // Ensure both id and _id exist for compatibility
    id: userData.id || userData._id,
    _id: userData._id || userData.id,
    // Ensure name field exists
    name: userData.name || userData.fullName,
    fullName: userData.fullName || userData.name
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        // Parse and normalize stored user
        const parsedUser = JSON.parse(storedUser);
        const normalizedUser = normalizeUserData(parsedUser);
        
        // Set user immediately for faster UI
        setUser(normalizedUser);
        setIsAuthenticated(true);

        // Verify token is still valid
        try {
          const response = await authAPI.getCurrentUser();
          
          // Handle different response structures
          const userData = response.data?.user || response.user || response.data;
          
          if (userData) {
            const freshNormalizedUser = normalizeUserData(userData);
            setUser(freshNormalizedUser);
            localStorage.setItem('user', JSON.stringify(freshNormalizedUser));
          }
        } catch (verifyError) {
          console.warn('⚠️ Token verification failed:', verifyError);
          // Only clear if it's a 401/403 error
          if (verifyError.response?.status === 401 || verifyError.response?.status === 403) {
            throw verifyError;
          }
          // Otherwise keep using cached data
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      
      if (response.success && response.token) {
        const normalizedUser = normalizeUserData(response.user);
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        setUser(normalizedUser);
        setIsAuthenticated(true);
        
        console.log('✅ Login successful:', normalizedUser);
        return { success: true, user: normalizedUser };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Invalid credentials. Please try again.' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData);
      
      if (response.success && response.token) {
        const normalizedUser = normalizeUserData(response.user);
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        setUser(normalizedUser);
        setIsAuthenticated(true);
        
        console.log('✅ Signup successful:', normalizedUser);
        return { success: true, user: normalizedUser };
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('❌ Signup error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('❌ Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      console.log('✅ Logged out successfully');
    }
  };

  const updateUser = (updatedUserData) => {
    const normalizedUser = normalizeUserData(updatedUserData);
    setUser(normalizedUser);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    signup,
    logout,
    checkAuth,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};