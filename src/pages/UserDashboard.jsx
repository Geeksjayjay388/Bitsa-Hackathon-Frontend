import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Rocket, 
  CheckCircle, 
  User, 
  Zap, 
  Ticket, 
  Plus, 
  Target, 
  Calendar, 
  Clock, 
  MapPin, 
  Eye, 
  X 
} from "lucide-react";

const API_URL = "https://bitsa-website-backend.onrender.com/api";

function UserDashboard() {
  const { user } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token') || user?.token;

        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        if (!user?.id) {
          setError('User ID not found');
          setLoading(false);
          return;
        }

        console.log('Fetching events for user:', user.id);
        
        const response = await fetch(`${API_URL}/users/${user.id}/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch events' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        
        // Process the events to add status based on date
        const processedEvents = (data.events || data.data || []).map(event => ({
          ...event,
          status: new Date(event.date) < new Date() ? 'completed' : 'upcoming'
        }));
        
        setRegisteredEvents(processedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchRegisteredEvents();
    } else {
      setLoading(false);
      setError('User not authenticated');
    }
  }, [user]);

  const handleCancelRegistration = async (eventId) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) return;
    
    try {
      const token = localStorage.getItem('token') || user?.token;

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/events/${eventId}/unregister`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel registration');
      }

      // Remove the event from the list
      setRegisteredEvents(prev => prev.filter(event => event._id !== eventId));
      alert('Registration cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling registration:', error);
      alert(error.message || 'Failed to cancel registration');
    }
  };

  const displayName = user?.name || user?.email?.split('@')[0] || "User";
  const upcomingEvents = registeredEvents.filter(e => e.status === "upcoming");
  const completedEvents = registeredEvents.filter(e => e.status === "completed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-50"></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-4xl shadow-2xl">
                {displayName.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                Welcome back, {displayName}!
              </h1>
              <p className="text-slate-300 text-lg mb-4">{user?.email}</p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-xl">
                  <span className="text-cyan-400 font-bold text-lg">{upcomingEvents.length}</span>
                  <span className="text-slate-300 ml-2">Upcoming Events</span>
                </div>
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-xl">
                  <span className="text-blue-400 font-bold text-lg">{completedEvents.length}</span>
                  <span className="text-slate-300 ml-2">Completed Events</span>
                </div>
                <div className="px-4 py-2 bg-purple-500/10 border border-purple-400/30 rounded-xl">
                  <span className="text-purple-400 font-bold text-lg">{registeredEvents.length}</span>
                  <span className="text-slate-300 ml-2">Total Registered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
            }`}
          >
            <BarChart3 size={20} />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === "upcoming"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
            }`}
          >
            <Rocket size={20} />
            Upcoming ({upcomingEvents.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === "completed"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
            }`}
          >
            <CheckCircle size={20} />
            Completed ({completedEvents.length})
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
            }`}
          >
            <User size={20} />
            Profile
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-6 mb-8">
            <p className="text-red-400 text-center font-semibold">⚠️ {error}</p>
            <p className="text-red-300 text-center text-sm mt-2">
              Please try refreshing the page. If the issue persists, check your connection and authentication.
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-300 mt-4">Loading your dashboard...</p>
          </div>
        )}

        {/* Content based on active tab */}
        {!loading && !error && (
          <>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="text-cyan-400" size={24} />
                    Quick Actions
                  </h2>
                  <div className="space-y-3">
                    <Link
                      to="/events"
                      className="flex items-center gap-3 px-4 py-3 bg-cyan-500/10 border border-cyan-400/30 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-all"
                    >
                      <Ticket size={20} />
                      Browse All Events
                    </Link>
                    <Link
                      to="/events"
                      className="flex items-center gap-3 px-4 py-3 bg-blue-500/10 border border-blue-400/30 rounded-xl text-blue-400 hover:bg-blue-500/20 transition-all"
                    >
                      <Plus size={20} />
                      Register for New Event
                    </Link>
                  </div>
                </div>

                {/* Next Upcoming Event */}
                {upcomingEvents.length > 0 ? (
                  <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Target className="text-cyan-400" size={24} />
                      Next Event
                    </h2>
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-400/20">
                      <h3 className="text-xl font-bold text-cyan-400 mb-2">{upcomingEvents[0].title}</h3>
                      <div className="space-y-2 text-slate-300">
                        <p className="flex items-center gap-2">
                          <Calendar size={18} className="text-cyan-400" />
                          {new Date(upcomingEvents[0].date).toLocaleDateString()}
                        </p>
                        {upcomingEvents[0].time && (
                          <p className="flex items-center gap-2">
                            <Clock size={18} className="text-cyan-400" />
                            {upcomingEvents[0].time}
                          </p>
                        )}
                        {upcomingEvents[0].location && (
                          <p className="flex items-center gap-2">
                            <MapPin size={18} className="text-cyan-400" />
                            {upcomingEvents[0].location}
                          </p>
                        )}
                      </div>
                      <Link
                        to={`/events/${upcomingEvents[0]._id}`}
                        className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                      >
                        <Eye size={18} />
                        View Details
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Target className="text-cyan-400" size={24} />
                      Next Event
                    </h2>
                    <div className="text-center py-8">
                      <p className="text-slate-400 mb-4">No upcoming events</p>
                      <Link
                        to="/events"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                      >
                        <Ticket size={18} />
                        Browse Events
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Upcoming Events Tab */}
            {activeTab === "upcoming" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Rocket size={48} className="mx-auto text-slate-500 mb-4" />
                    <p className="text-slate-400 text-lg mb-4">You have no upcoming events</p>
                    <Link
                      to="/events"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                      <Ticket size={18} />
                      Browse Events
                    </Link>
                  </div>
                ) : (
                  upcomingEvents.map((event) => (
                    <div
                      key={event._id}
                      className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all"
                    >
                      {event.image ? (
                        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}>
                          <div className="h-full bg-gradient-to-t from-slate-900 to-transparent"></div>
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          <Ticket size={64} className="text-white/50" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                        {event.description && (
                          <p className="text-slate-400 text-sm mb-3 line-clamp-2">{event.description}</p>
                        )}
                        <div className="space-y-2 text-slate-300 mb-4">
                          <p className="flex items-center gap-2">
                            <Calendar size={16} className="text-cyan-400" />
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                          {event.time && (
                            <p className="flex items-center gap-2">
                              <Clock size={16} className="text-cyan-400" />
                              {event.time}
                            </p>
                          )}
                          {event.location && (
                            <p className="flex items-center gap-2">
                              <MapPin size={16} className="text-cyan-400" />
                              {event.location}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to={`/events/${event._id}`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500/20 transition-all"
                          >
                            <Eye size={16} />
                            View
                          </Link>
                          <button
                            onClick={() => handleCancelRegistration(event._id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 border border-red-400/30 text-red-400 font-bold rounded-xl hover:bg-red-500/20 transition-all"
                          >
                            <X size={16} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Completed Events Tab */}
            {activeTab === "completed" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedEvents.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <CheckCircle size={48} className="mx-auto text-slate-500 mb-4" />
                    <p className="text-slate-400 text-lg">No completed events yet</p>
                  </div>
                ) : (
                  completedEvents.map((event) => (
                    <div
                      key={event._id}
                      className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden opacity-75"
                    >
                      {event.image ? (
                        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}>
                          <div className="h-full bg-gradient-to-t from-slate-900 to-transparent flex items-center justify-center">
                            <CheckCircle size={64} className="text-green-400" />
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 bg-slate-900/50 flex items-center justify-center">
                          <CheckCircle size={64} className="text-green-400" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                        <div className="space-y-2 text-slate-300 mb-4">
                          <p className="flex items-center gap-2">
                            <Calendar size={16} className="text-green-400" />
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                          {event.location && (
                            <p className="flex items-center gap-2">
                              <MapPin size={16} className="text-green-400" />
                              {event.location}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 border border-green-400/30 text-green-400 font-bold rounded-xl">
                          <CheckCircle size={16} />
                          Completed
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <User className="text-cyan-400" size={32} />
                    Profile Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-400 mb-2">Full Name</label>
                      <div className="px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white">
                        {user?.name || "Not provided"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-2">Email Address</label>
                      <div className="px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white">
                        {user?.email}
                      </div>
                    </div>

                    {user?.phone && (
                      <div>
                        <label className="block text-slate-400 mb-2">Phone Number</label>
                        <div className="px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white">
                          {user.phone}
                        </div>
                      </div>
                    )}

                    {user?.role && (
                      <div>
                        <label className="block text-slate-400 mb-2">Role</label>
                        <div className="px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white capitalize">
                          {user.role}
                        </div>
                      </div>
                    )}

                    {user?.createdAt && (
                      <div>
                        <label className="block text-slate-400 mb-2">Member Since</label>
                        <div className="px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
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