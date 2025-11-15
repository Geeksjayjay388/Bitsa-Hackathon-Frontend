import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminAPI, eventsAPI, blogsAPI, galleryAPI } from '../services/api';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [formData, setFormData] = useState({});
  const [galleryFile, setGalleryFile] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, eventsData, blogsData, galleryData] = await Promise.all([
        adminAPI.getDashboardStats(),
        eventsAPI.getAll(),
        blogsAPI.getAll(),
        galleryAPI.getAll()
      ]);
      setStats(statsData.data);
      setEvents(eventsData.data || []);
      setBlogs(blogsData.data || []);
      setGallery(galleryData.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Move these functions OUTSIDE of fetchDashboardData
  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await adminAPI.getAllFeedback();
      setFeedback(response.data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      if (type === 'createEvent' || type === 'editEvent') {
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          venue: '',
          capacity: '',
          imageUrl: '',
          category: 'Competition',
          status: 'upcoming'
        });
      } else if (type === 'createBlog' || type === 'editBlog') {
        setFormData({
          title: '',
          content: '',
          category: 'tutorial',
          imageUrl: '',
          author: '',
          authorRole: '',
          excerpt: '',
          readTime: '',
          featured: false,
          published: true
        });
      } else if (type === 'uploadGallery') {
        setFormData({
          title: '',
          description: '',
          category: 'Hackathons'
        });
        setGalleryFile(null);
      }
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
    setFormData({});
    setGalleryFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      if (modalType === 'createEvent') {
        await adminAPI.createEvent(formData);
      } else if (modalType === 'editEvent') {
        await adminAPI.updateEvent(editingItem._id, formData);
      } else if (modalType === 'createBlog') {
        await adminAPI.createBlog(formData);
      } else if (modalType === 'editBlog') {
        await adminAPI.updateBlog(editingItem._id, formData);
      } else if (modalType === 'uploadGallery') {
        const formDataToSend = new FormData();
        formDataToSend.append('image', galleryFile);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('category', formData.category);
        await adminAPI.uploadToGallery(formDataToSend);
      }
      await fetchDashboardData();
      closeModal();
      alert('Success!');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      if (type === 'event') {
        await adminAPI.deleteEvent(id);
      } else if (type === 'blog') {
        await adminAPI.deleteBlog(id);
      } else if (type === 'gallery') {
        await adminAPI.deleteFromGallery(id);
      } else if (type === 'feedback') {
        await adminAPI.deleteFeedback(id);
        await fetchFeedback();
        alert('Deleted successfully!');
        return;
      }
      await fetchDashboardData();
      alert('Deleted successfully!');
    } catch (error) {
      alert('Error deleting: ' + error.message);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'events', name: 'Events', icon: '📅' },
    { id: 'blogs', name: 'Blogs', icon: '📝' },
    { id: 'gallery', name: 'Gallery', icon: '🖼️' },
    { id: 'feedback', name: 'Feedback', icon: '💬' },
    { id: 'users', name: 'Users', icon: '👥' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background - FIXED COLORS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Top Navigation - FIXED COLORS */}
        <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center">
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">B</span>
                </div>
                <div>
                  <h1 className="text-xl font-black text-white">BITSA Admin</h1>
                  <p className="text-slate-400 text-sm">Management Dashboard</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white font-semibold">{user?.name}</p>
                  <p className="text-slate-400 text-sm">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-red-500/20 hover:border-red-500/50 transition-all text-sm font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Tab Navigation - FIXED BUTTONS */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'users') fetchUsers();
                    if (tab.id === 'feedback') fetchFeedback();
                  }}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-400/50'
                      : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab - FIXED COLORS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Users', value: stats?.totalUsers || 0, icon: '👥', color: 'from-cyan-500 to-blue-500' },
                  { label: 'Total Events', value: stats?.totalEvents || 0, icon: '📅', color: 'from-blue-500 to-indigo-500' },
                  { label: 'Total Blogs', value: stats?.totalBlogs || 0, icon: '📝', color: 'from-indigo-500 to-blue-500' },
                  { label: 'Pending Feedback', value: stats?.pendingFeedback || 0, icon: '💬', color: 'from-blue-500 to-cyan-500' },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300"
                    style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center mb-4 text-2xl`}>
                      {stat.icon}
                    </div>
                    <p className="text-slate-400 text-sm font-semibold mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-white">Manage Events</h2>
                <button 
                  onClick={() => openModal('createEvent')}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  + Create Event
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {events.map((event) => (
                  <div key={event._id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black text-white">{event.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            event.status === 'upcoming' ? 'bg-green-500/20 text-green-400' :
                            event.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {event.status}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="text-cyan-400">📅 {new Date(event.date).toLocaleDateString()}</span>
                          <span className="text-blue-400">⏰ {event.time}</span>
                          <span className="text-indigo-400">📍 {event.venue}</span>
                          <span className="text-cyan-400">🏆 {event.category}</span>
                          <span className="text-blue-400">👥 {event.registeredUsers?.length || 0}/{event.capacity}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openModal('editEvent', event)}
                          className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete('event', event._id)}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    No events yet. Create your first event!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Blogs Tab - FIXED COLORS */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-white">Manage Blogs</h2>
                <button 
                  onClick={() => openModal('createBlog')}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  + Create Blog
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                  <div key={blog._id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all">
                    {blog.imageUrl && (
                      <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-black text-white flex-1">{blog.title}</h3>
                        {blog.featured && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{blog.excerpt || blog.content?.substring(0, 100) + '...'}</p>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-4 text-sm">
                          <span className="text-cyan-400">👁️ {blog.views || 0}</span>
                          <span className="text-blue-400">❤️ {blog.likes?.length || 0}</span>
                          <span className="text-indigo-400 capitalize">{blog.category}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          blog.published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openModal('editBlog', blog)}
                          className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete('blog', blog._id)}
                          className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {blogs.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-slate-400">
                    No blogs yet. Create your first blog post!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-white">Gallery Management</h2>
                <button 
                  onClick={() => openModal('uploadGallery')}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  + Upload Image
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gallery.map((item) => (
                  <div key={item._id} className="bg-white/5 rounded-xl overflow-hidden group">
                    <img 
                      src={item.image?.url || item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="p-4">
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">
                          {item.category}
                        </span>
                        <button 
                          onClick={() => handleDelete('gallery', item._id)}
                          className="text-red-400 text-sm hover:text-red-300 font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {gallery.length === 0 && (
                  <div className="col-span-3 text-center py-12 text-slate-400">
                    No images yet. Upload your first photo!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-white">User Management</h2>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider">Events</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {users.map((u) => (
                        <tr key={u._id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                <span className="text-cyan-400 font-bold">{u.name?.charAt(0).toUpperCase()}</span>
                              </div>
                              <span className="text-white font-semibold">{u.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-400">{u.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              u.role === 'admin' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-cyan-400 font-semibold">
                            {u.registeredEvents?.length || 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                      <p>No users found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-white">Feedback Management</h2>
              <div className="grid grid-cols-1 gap-4">
                {feedback.map((item) => (
                  <div key={item._id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                          <span className="text-cyan-400 font-bold text-lg">
                            {item.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-bold">{item.name}</p>
                          <p className="text-slate-400 text-sm">{item.email}</p>
                        </div>
                      </div>
                      <span className="text-slate-500 text-sm">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {item.subject && (
                      <h4 className="text-cyan-400 font-bold mb-2">{item.subject}</h4>
                    )}
                    
                    <p className="text-slate-300 mb-4 leading-relaxed">{item.message}</p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete('feedback', item._id)}
                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                
                {feedback.length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <p>No feedback submissions yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal - FIXED COLORS */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
              <h3 className="text-2xl font-black text-white">
                {modalType === 'createEvent' ? 'Create Event' : 
                 modalType === 'editEvent' ? 'Edit Event' :
                 modalType === 'createBlog' ? 'Create Blog' : 
                 modalType === 'editBlog' ? 'Edit Blog' :
                 'Upload Image'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white text-2xl">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* EVENT FORM */}
              {(modalType === 'createEvent' || modalType === 'editEvent') && (
                <>
                  <input
                    type="text"
                    placeholder="Event Title *"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                  />
                  <textarea
                    placeholder="Description *"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 text-sm mb-2 block">Date *</label>
                      <input
                        type="date"
                        value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-400/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm mb-2 block">Time</label>
                      <input
                        type="text"
                        placeholder="e.g., 2:00 PM"
                        value={formData.time || ''}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Venue"
                    value={formData.venue || ''}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 text-sm mb-2 block">Capacity *</label>
                      <input
                        type="number"
                        placeholder="Max attendees"
                        value={formData.capacity || ''}
                        onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                        required
                        min="1"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm mb-2 block">Category</label>
                      <select
                        value={formData.category || 'Competition'}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-400/50 focus:outline-none"
                      >
                        <option value="Competition">Competition</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Networking">Networking</option>
                        <option value="Seminar">Seminar</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">Status</label>
                    <select
                      value={formData.status || 'upcoming'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-400/50 focus:outline-none"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                  />
                </>
              )}

              {/* BLOG FORM */}
              {(modalType === 'createBlog' || modalType === 'editBlog') && (
                <>
                  <input
                    type="text"
                    placeholder="Blog Title *"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                  />
                  <textarea
                    placeholder="Content *"
                    value={formData.content || ''}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                  />
                  <textarea
                    placeholder="Excerpt (brief summary)"
                    value={formData.excerpt || ''}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows="2"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 text-sm mb-2 block">Category *</label>
                      <select
                        value={formData.category || 'tutorial'}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-400/50 focus:outline-none"
                      >
                        <option value="tutorial">Tutorial</option>
                        <option value="article">Article</option>
                        <option value="news">News</option>
                        <option value="guide">Guide</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm mb-2 block">Read Time</label>
                      <input
                        type="text"
                        placeholder="e.g., 5 min read"
                        value={formData.readTime || ''}
                        onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Author Name"
                      value={formData.author || ''}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Author Role"
                      value={formData.authorRole || ''}
                      onChange={(e) => setFormData({...formData, authorRole: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                    />
                  </div>
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                  />
                  <div className="flex gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured || false}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-400"
                      />
                      <span className="text-white font-semibold">Featured Post</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.published !== false}
                        onChange={(e) => setFormData({...formData, published: e.target.checked})}
                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-400"
                      />
                      <span className="text-white font-semibold">Publish Immediately</span>
                    </label>
                  </div>
                </>
              )}

              {/* GALLERY FORM */}
              {modalType === 'uploadGallery' && (
                <>
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">Upload Image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setGalleryFile(e.target.files[0])}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 file:font-semibold hover:file:bg-cyan-500/30 focus:border-cyan-400/50 focus:outline-none"
                    />
                    {galleryFile && (
                      <p className="text-green-400 text-sm mt-2">✓ {galleryFile.name}</p>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Image Title *"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    maxLength="100"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                  />
                  <textarea
                    placeholder="Description *"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    maxLength="200"
                    rows="3"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
                  />
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">Category *</label>
                    <select
                      value={formData.category || 'Hackathons'}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-400/50 focus:outline-none"
                    >
                      <option value="Hackathons">Hackathons</option>
                      <option value="Workshops">Workshops</option>
                      <option value="Events">Events</option>
                      <option value="Team">Team</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {modalType === 'uploadGallery' ? 'Uploading...' : 'Saving...'}
                  </>
                ) : (
                  editingItem ? 'Update' : modalType === 'uploadGallery' ? 'Upload' : 'Create'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;