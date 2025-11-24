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
  
  register: async (id) => {
    try {
      const response = await apiCall(`/events/${id}/register`, { method: 'POST' }, true);
      return response;
    } catch (error) {
      if (error.message.includes('already registered')) {
        throw new Error('You have already registered for this event');
      }
      throw error;
    }
  },
  
  unregister: (id) => apiCall(`/events/${id}/unregister`, { method: 'DELETE' }, true),

  getMyEvents: async () => {
    try {
      const response = await apiCall('/events/my/events', {}, true);
      
      if (Array.isArray(response)) {
        return response;
      } else if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else if (response.events && Array.isArray(response.events)) {
        return response.events;
      }
      
      console.error('Unexpected response format from /events/my/events:', response);
      return [];
    } catch (error) {
      console.error('Error fetching my events:', error);
      throw error;
    }
  },
  
  approveRegistration: (registrationId, notes = '') => 
    apiCall(`/registrations/${registrationId}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ notes })
    }, true),
  
  rejectRegistration: (registrationId, notes = '') => 
    apiCall(`/registrations/${registrationId}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ notes })
    }, true),
};

// ===== BLOGS =====
export const blogsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/blogs${query ? `?${query}` : ''}`);
  },
  getOne: (id) => apiCall(`/blogs/${id}`),
  getById: (id) => apiCall(`/blogs/${id}`),
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
  submit: (data) => apiCall('/feedback', { method: 'POST', body: JSON.stringify(data) }, true), // Now requires auth
  getMy: () => apiCall('/feedback/my', {}, true), // Get user's own feedback with responses
};

// ===== ADMIN =====
export const adminAPI = {
  getDashboardStats: () => apiCall('/admin/dashboard/stats', {}, true),

  // Events
  createEvent: (data) => apiCall('/admin/events', { method: 'POST', body: JSON.stringify(data) }, true),
  updateEvent: (id, data) => apiCall(`/admin/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }, true),
  deleteEvent: (id) => apiCall(`/admin/events/${id}`, { method: 'DELETE' }, true),
  
  getEventRegistrations: async (eventId) => {
    try {
      const response = await apiCall(`/admin/events/${eventId}/registrations`, {}, true);
      
      if (response.data && Array.isArray(response.data)) {
        return { data: response.data };
      } else if (Array.isArray(response)) {
        return { data: response };
      } else if (response.registrations && Array.isArray(response.registrations)) {
        return { data: response.registrations };
      }
      
      console.error('Unexpected response format:', response);
      return { data: [] };
    } catch (error) {
      console.error('Error fetching event registrations:', error);
      return { data: [] };
    }
  },

  // Blogs
  createBlog: (data) => apiCall('/admin/blogs', { method: 'POST', body: JSON.stringify(data) }, true),
  updateBlog: (id, data) => apiCall(`/admin/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }, true),
  deleteBlog: (id) => apiCall(`/admin/blogs/${id}`, { method: 'DELETE' }, true),

  // Gallery
  uploadToGallery: async (formData) => {
    const token = getAuthToken();
    try {
      const response = await fetch(`${API_URL}/gallery`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}` 
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }
      
      return data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },
  deleteFromGallery: (id) => apiCall(`/gallery/${id}`, { method: 'DELETE' }, true),

  // Feedback
  getAllFeedback: () => apiCall('/feedback/admin/all', {}, true),
  updateFeedbackStatus: (id, data) => apiCall(`/feedback/${id}/status`, { method: 'PUT', body: JSON.stringify(data) }, true),
  respondToFeedback: (id, response) => apiCall(`/feedback/${id}/respond`, { 
    method: 'PUT', 
    body: JSON.stringify({ response }) 
  }, true),
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