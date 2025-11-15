const API_URL = 'https://bitsa-website-backend.onrender.com/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
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
  // FIXED: Changed from /auth/signup to /auth/register to match backend
  signup: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Also adding register as alias for consistency
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  getCurrentUser: () => apiCall('/auth/me'),
  
  logout: () => apiCall('/auth/logout', {
    method: 'POST',
  }),

  updateDetails: (userData) => apiCall('/auth/updatedetails', {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),

  updatePassword: (passwordData) => apiCall('/auth/updatepassword', {
    method: 'PUT',
    body: JSON.stringify(passwordData),
  }),
};

// ===== EVENTS =====
export const eventsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/events${query ? `?${query}` : ''}`);
  },

  getOne: (id) => apiCall(`/events/${id}`),

  register: (id) => apiCall(`/events/${id}/register`, {
    method: 'POST',
  }),

  unregister: (id) => apiCall(`/events/${id}/unregister`, {
    method: 'DELETE',
  }),

  getMyEvents: () => apiCall('/events/my/events'),
};

// ===== BLOGS =====
export const blogsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/blogs${query ? `?${query}` : ''}`);
  },

  getOne: (id) => apiCall(`/blogs/${id}`),

  like: (id) => apiCall(`/blogs/${id}/like`, {
    method: 'POST',
  }),

  unlike: (id) => apiCall(`/blogs/${id}/unlike`, {
    method: 'DELETE',
  }),
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
  submit: (feedbackData) => apiCall('/feedback', {
    method: 'POST',
    body: JSON.stringify(feedbackData),
  }),

  getMy: () => apiCall('/feedback/my'),
};

// ===== ADMIN =====
export const adminAPI = {
  // Dashboard
  getDashboardStats: () => apiCall('/admin/dashboard/stats'),

  // Events
  createEvent: (eventData) => apiCall('/admin/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),

  updateEvent: (id, eventData) => apiCall(`/admin/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  }),

  deleteEvent: (id) => apiCall(`/admin/events/${id}`, {
    method: 'DELETE',
  }),

  getEventRegistrations: (id) => apiCall(`/admin/events/${id}/registrations`),

  // Blogs
  createBlog: (blogData) => apiCall('/admin/blogs', {
    method: 'POST',
    body: JSON.stringify(blogData),
  }),

  updateBlog: (id, blogData) => apiCall(`/admin/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(blogData),
  }),

  deleteBlog: (id) => apiCall(`/admin/blogs/${id}`, {
    method: 'DELETE',
  }),

  // Gallery
  uploadToGallery: async (formData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/admin/gallery`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // FormData with file
    });
    return response.json();
  },

  deleteFromGallery: (id) => apiCall(`/admin/gallery/${id}`, {
    method: 'DELETE',
  }),

  // Feedback
  getAllFeedback: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/admin/feedback${query ? `?${query}` : ''}`);
  },

  updateFeedbackStatus: (id, statusData) => apiCall(`/admin/feedback/${id}`, {
    method: 'PUT',
    body: JSON.stringify(statusData),
  }),

  deleteFeedback: (id) => apiCall(`/admin/feedback/${id}`, {
    method: 'DELETE',
  }),

  // Users
  getAllUsers: () => apiCall('/admin/users'),

  updateUserRole: (id, roleData) => apiCall(`/admin/users/${id}/role`, {
    method: 'PUT',
    body: JSON.stringify(roleData),
  }),
};

export default {
  auth: authAPI,
  events: eventsAPI,
  blogs: blogsAPI,
  gallery: galleryAPI,
  feedback: feedbackAPI,
  admin: adminAPI,
};