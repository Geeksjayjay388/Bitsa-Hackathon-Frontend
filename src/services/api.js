const API_URL = 'https://bitsa-website-backend.onrender.com/api';

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('token');

// Helper function for API calls
const apiCall = async (endpoint, options = {}, authRequired = false) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(authRequired && token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ===== AUTH =====
export const authAPI = {
  signup: (userData) => apiCall('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  register: (userData) => apiCall('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getCurrentUser: () => apiCall('/auth/me', {}, true),
  logout: () => apiCall('/auth/logout', { method: 'POST' }, true),
  updateDetails: (userData) => apiCall('/auth/updatedetails', { method: 'PUT', body: JSON.stringify(userData) }, true),
  updatePassword: (passwordData) => apiCall('/auth/updatepassword', { method: 'PUT', body: JSON.stringify(passwordData) }, true),
};

// ===== EVENTS =====
export const eventsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/events${query ? `?${query}` : ''}`);
  },
  getOne: (id) => apiCall(`/events/${id}`),
  register: (id) => apiCall(`/events/${id}/register`, { method: 'POST' }, true),
  unregister: (id) => apiCall(`/events/${id}/unregister`, { method: 'DELETE' }, true),
  getMyEvents: () => apiCall('/events/my/events', {}, true),
};

// ===== BLOGS =====
export const blogsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/blogs${query ? `?${query}` : ''}`);
  },
  getOne: (id) => apiCall(`/blogs/${id}`),
  getById: (id) => apiCall(`/blogs/${id}`), // Added this method for BlogDetail component
  like: (id) => apiCall(`/blogs/${id}/like`, { method: 'POST' }, true),
  unlike: (id) => apiCall(`/blogs/${id}/unlike`, { method: 'DELETE' }, true),
};

// ===== GALLERY =====
export const galleryAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/gallery${query ? `?${query}` : ''}`);
  },
  getOne: (id) => apiCall(`/gallery/${id}`),
};

// ===== FEEDBACK =====
export const feedbackAPI = {
  submit: (data) => apiCall('/feedback', { method: 'POST', body: JSON.stringify(data) }),
  getMy: () => apiCall('/feedback/my', {}, true),
};

// ===== ADMIN =====
export const adminAPI = {
  getDashboardStats: () => apiCall('/admin/dashboard/stats', {}, true),

  // Events
  createEvent: (data) => apiCall('/admin/events', { method: 'POST', body: JSON.stringify(data) }, true),
  updateEvent: (id, data) => apiCall(`/admin/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }, true),
  deleteEvent: (id) => apiCall(`/admin/events/${id}`, { method: 'DELETE' }, true),
  getEventRegistrations: (id) => apiCall(`/admin/events/${id}/registrations`, {}, true),

  // Blogs
  createBlog: (data) => apiCall('/admin/blogs', { method: 'POST', body: JSON.stringify(data) }, true),
  updateBlog: (id, data) => apiCall(`/admin/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }, true),
  deleteBlog: (id) => apiCall(`/admin/blogs/${id}`, { method: 'DELETE' }, true),

  // Gallery
  uploadToGallery: async (formData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/admin/gallery`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return response.json();
  },
  deleteFromGallery: (id) => apiCall(`/admin/gallery/${id}`, { method: 'DELETE' }, true),

  // Feedback
  getAllFeedback: () => apiCall('/feedback/admin/all', {}, true),
  updateFeedbackStatus: (id, data) => apiCall(`/feedback/${id}/status`, { method: 'PUT', body: JSON.stringify(data) }, true),
  deleteFeedback: (id) => apiCall(`/feedback/${id}`, { method: 'DELETE' }, true),

  // Users
  getAllUsers: () => apiCall('/admin/users', {}, true),
  updateUserRole: (id, data) => apiCall(`/admin/users/${id}/role`, { method: 'PUT', body: JSON.stringify(data) }, true),
};

export default {
  auth: authAPI,
  events: eventsAPI,
  blogs: blogsAPI,
  gallery: galleryAPI,
  feedback: feedbackAPI,
  admin: adminAPI,
};