import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { eventsAPI, authAPI } from "../services/api";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Eye, 
  X,
  Camera,
  Edit2,
  CheckCircle,
  Ticket,
  Mail,
  TrendingUp,
  Award,
  User as UserIcon,
  ChevronRight,
  Sparkles,
  AlertCircle
} from "lucide-react";

function UserDashboard() {
  const { user, updateUser } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("registered");
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    bio: ""
  });
  const [uploading, setUploading] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(user?.profilePicture || null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        phone: user.phone || "",
        bio: user.bio || ""
      });
      setProfilePictureUrl(user.profilePicture);
    }
  }, [user]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await eventsAPI.getMyEvents();
        
        let eventsArray = [];
        if (Array.isArray(data)) {
          eventsArray = data;
        } else if (data.events && Array.isArray(data.events)) {
          eventsArray = data.events;
        } else if (data.data && Array.isArray(data.data)) {
          eventsArray = data.data;
        }
        
        const processedEvents = eventsArray.map(event => ({
          ...event,
          status: new Date(event.date) < new Date() ? 'completed' : 'upcoming'
        }));
        
        setRegisteredEvents(processedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message || 'Failed to load your events');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchRegisteredEvents();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleCancelRegistration = async (eventId) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) return;
    
    try {
      await eventsAPI.unregister(eventId);
      setRegisteredEvents(prev => prev.filter(event => event._id !== eventId));
      alert('Registration cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling registration:', error);
      alert(error.message || 'Failed to cancel registration');
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('profilePicture', file);

      const token = localStorage.getItem('token');
      const response = await fetch('https://bitsa-website-backend.onrender.com/api/auth/updatedetails', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      const data = await response.json();
      
      if (data.data) {
        if (updateUser) {
          updateUser(data.data);
        }
        setProfilePictureUrl(data.data.profilePicture);
      }

      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert(error.message || 'Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const data = await authAPI.updateDetails(profileData);
      
      if (updateUser && data.data) {
        updateUser(data.data);
      }
      
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Failed to update profile');
    }
  };

  const displayName = user?.name || user?.email?.split('@')[0] || "User";
  const upcomingEvents = registeredEvents.filter(e => e.status === "upcoming");
  const completedEvents = registeredEvents.filter(e => e.status === "completed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden mb-8">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 h-40 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-800/90"></div>
          </div>
          
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="relative w-36 h-36 rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 ring-4 ring-cyan-500/20">
                  {profilePictureUrl ? (
                    <img 
                      src={profilePictureUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                      key={profilePictureUrl}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 text-white text-5xl font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="profile-picture-upload" 
                  className="absolute -bottom-2 -right-2 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 p-3.5 rounded-2xl cursor-pointer transition-all shadow-lg shadow-cyan-500/50 group-hover:scale-110"
                >
                  <Camera size={20} className="text-white" />
                  <input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* User Info */}
              <div className="flex-1 md:ml-6">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">{displayName}</h1>
                  
                </div>
                <p className="text-slate-400 flex items-center gap-2 mb-6 text-lg">
                  <Mail size={18} className="text-cyan-400" />
                  {user?.email}
                </p>
                
                {/* Stats Cards */}
                <div className="flex flex-wrap gap-4">
                  <div className="group relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/30 px-6 py-3.5 rounded-2xl hover:border-cyan-400/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-3">
                      <TrendingUp className="text-cyan-400" size={24} />
                      <div>
                        <div className="text-3xl font-bold text-cyan-400">{upcomingEvents.length}</div>
                        <div className="text-slate-400 text-sm font-medium">Upcoming</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 px-6 py-3.5 rounded-2xl hover:border-green-400/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-3">
                      <CheckCircle className="text-green-400" size={24} />
                      <div>
                        <div className="text-3xl font-bold text-green-400">{completedEvents.length}</div>
                        <div className="text-slate-400 text-sm font-medium">Completed</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 px-6 py-3.5 rounded-2xl hover:border-purple-400/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-3">
                      <Award className="text-purple-400" size={24} />
                      <div>
                        <div className="text-3xl font-bold text-purple-400">{registeredEvents.length}</div>
                        <div className="text-slate-400 text-sm font-medium">Total Events</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl p-2 mb-8 inline-flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("registered")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "registered"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Ticket size={18} />
              Registered ({registeredEvents.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "upcoming"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <TrendingUp size={18} />
              Upcoming ({upcomingEvents.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "completed"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <CheckCircle size={18} />
              Completed ({completedEvents.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <UserIcon size={18} />
              Profile
            </span>
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/50 rounded-2xl p-5 mb-8 shadow-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-400" size={24} />
              <p className="text-red-400 font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 text-lg font-medium">Loading your dashboard...</p>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Registered Events Tab */}
            {activeTab === "registered" && (
              <div>
                {registeredEvents.length === 0 ? (
                  <div className="text-center py-20 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-xl">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Ticket size={40} className="text-slate-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">No Events Yet</h3>
                    <p className="text-slate-400 mb-8 text-lg">You haven't registered for any events</p>
                    <a
                      href="/events"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                    >
                      <Sparkles size={20} />
                      Browse Events
                      <ChevronRight size={20} />
                    </a>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {registeredEvents.map((event) => (
                      <div
                        key={event._id}
                        className={`group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 ${
                          event.status === 'completed' ? 'opacity-70' : ''
                        }`}
                      >
                        {event.image ? (
                          <div className="h-52 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${event.image})` }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                            {event.status === 'completed' && (
                              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                <CheckCircle size={56} className="text-green-400" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className={`h-52 flex items-center justify-center relative overflow-hidden ${
                            event.status === 'completed' 
                              ? 'bg-gradient-to-br from-slate-700 to-slate-800' 
                              : 'bg-gradient-to-br from-cyan-900/30 via-blue-900/30 to-purple-900/30'
                          }`}>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
                            {event.status === 'completed' ? (
                              <CheckCircle size={56} className="text-green-400 relative z-10" />
                            ) : (
                              <Ticket size={56} className="text-cyan-400 relative z-10" />
                            )}
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">{event.title}</h3>
                            {event.status === 'completed' && (
                              <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-400 text-xs font-bold rounded-full whitespace-nowrap ml-2">
                                Completed
                              </span>
                            )}
                            {event.status === 'upcoming' && (
                              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-bold rounded-full whitespace-nowrap ml-2">
                                Upcoming
                              </span>
                            )}
                          </div>
                          {event.description && (
                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                          )}
                          <div className="space-y-2.5 text-sm text-slate-400 mb-5">
                            <div className="flex items-center gap-2.5">
                              <Calendar size={16} className={event.status === 'completed' ? 'text-green-400' : 'text-cyan-400'} />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            {event.time && (
                              <div className="flex items-center gap-2.5">
                                <Clock size={16} className={event.status === 'completed' ? 'text-green-400' : 'text-cyan-400'} />
                                <span>{event.time}</span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-2.5">
                                <MapPin size={16} className={event.status === 'completed' ? 'text-green-400' : 'text-cyan-400'} />
                                <span className="line-clamp-1">{event.location}</span>
                              </div>
                            )}
                          </div>
                          {event.status === 'upcoming' && (
                            <button
                              onClick={() => handleCancelRegistration(event._id)}
                              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/50 bg-red-500/10 text-red-400 font-semibold rounded-xl hover:bg-red-500/20 transition-all"
                            >
                              <X size={18} />
                              Cancel Registration
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Upcoming Events Tab */}
            {activeTab === "upcoming" && (
              <div>
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-20 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-xl">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <TrendingUp size={40} className="text-slate-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">No Upcoming Events</h3>
                    <p className="text-slate-400 mb-8 text-lg">You don't have any upcoming events</p>
                    <a
                      href="/events"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                    >
                      <Sparkles size={20} />
                      Browse Events
                      <ChevronRight size={20} />
                    </a>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event._id}
                        className="group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
                      >
                        {event.image ? (
                          <div className="h-52 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${event.image})` }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                          </div>
                        ) : (
                          <div className="h-52 bg-gradient-to-br from-cyan-900/30 via-blue-900/30 to-purple-900/30 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
                            <Ticket size={56} className="text-cyan-400 relative z-10" />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">{event.title}</h3>
                          {event.description && (
                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                          )}
                          <div className="space-y-2.5 text-sm text-slate-400 mb-5">
                            <div className="flex items-center gap-2.5">
                              <Calendar size={16} className="text-cyan-400" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            {event.time && (
                              <div className="flex items-center gap-2.5">
                                <Clock size={16} className="text-cyan-400" />
                                <span>{event.time}</span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-2.5">
                                <MapPin size={16} className="text-cyan-400" />
                                <span className="line-clamp-1">{event.location}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <a
                              href={`/events/${event._id}`}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                            >
                              <Eye size={18} />
                              View
                            </a>
                            <button
                              onClick={() => handleCancelRegistration(event._id)}
                              className="flex items-center justify-center gap-2 px-4 py-3 border border-red-500/50 bg-red-500/10 text-red-400 font-semibold rounded-xl hover:bg-red-500/20 transition-all"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Completed Events Tab */}
            {activeTab === "completed" && (
              <div>
                {completedEvents.length === 0 ? (
                  <div className="text-center py-20 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-xl">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckCircle size={40} className="text-slate-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">No Completed Events</h3>
                    <p className="text-slate-400 text-lg">You haven't attended any events yet</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedEvents.map((event) => (
                      <div
                        key={event._id}
                        className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-2xl shadow-xl overflow-hidden opacity-75 hover:opacity-100 transition-all duration-300"
                      >
                        {event.image ? (
                          <div className="h-52 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${event.image})` }}>
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                              <CheckCircle size={56} className="text-green-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="h-52 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden">
                            <CheckCircle size={56} className="text-green-400" />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{event.title}</h3>
                          <div className="space-y-2.5 text-sm text-slate-400 mb-5">
                            <div className="flex items-center gap-2.5">
                              <Calendar size={16} className="text-green-400" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2.5">
                                <MapPin size={16} className="text-green-400" />
                                <span className="line-clamp-1">{event.location}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/50 text-green-400 font-semibold rounded-xl">
                            <CheckCircle size={18} />
                            Completed
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl">
                        <UserIcon size={28} className="text-cyan-400" />
                      </div>
                      Profile Settings
                    </h2>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                        editMode 
                          ? "bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600" 
                          : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30"
                      }`}
                    >
                      <Edit2 size={18} />
                      {editMode ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>
                  
                  {editMode ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Full Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="w-full px-5 py-3.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Email Address</label>
                        <div className="px-5 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-500 flex items-center gap-2">
                          <Mail size={18} className="text-slate-600" />
                          {user?.email} (cannot be changed)
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full px-5 py-3.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Bio</label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="w-full px-5 py-3.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                          placeholder="Tell us about yourself"
                          rows="4"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                      >
                        Save Changes
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-5">
                        <label className="block text-sm font-semibold text-slate-400 mb-2">Full Name</label>
                        <div className="text-white text-lg font-medium">{user?.name || "Not provided"}</div>
                      </div>

                      <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-5">
                        <label className="block text-sm font-semibold text-slate-400 mb-2">Email Address</label>
                        <div className="text-white text-lg font-medium flex items-center gap-2">
                          <Mail size={18} className="text-cyan-400" />
                          {user?.email}
                        </div>
                      </div>

                      <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-5">
                        <label className="block text-sm font-semibold text-slate-400 mb-2">Phone Number</label>
                        <div className="text-white text-lg font-medium">{user?.phone || "Not provided"}</div>
                      </div>

                      {user?.bio && (
                        <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-5">
                          <label className="block text-sm font-semibold text-slate-400 mb-2">Bio</label>
                          <div className="text-white text-lg">{user.bio}</div>
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        {user?.role && (
                          <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-5">
                            <label className="block text-sm font-semibold text-slate-400 mb-2">Role</label>
                            <div className="text-white text-lg font-medium capitalize flex items-center gap-2">
                              <Award size={18} className="text-purple-400" />
                              {user.role}
                            </div>
                          </div>
                        )}

                        {user?.createdAt && (
                          <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-5">
                            <label className="block text-sm font-semibold text-slate-400 mb-2">Member Since</label>
                            <div className="text-white text-lg font-medium">
                              {new Date(user.createdAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;