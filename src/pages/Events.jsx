import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Events() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, upcoming, ongoing, completed

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await eventsAPI.getAll(params);
      setEvents(response.data);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await eventsAPI.register(eventId);
      fetchEvents(); // Refresh events
      alert('Successfully registered for event!');
    } catch (err) {
      alert(err.message || 'Registration failed');
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      await eventsAPI.unregister(eventId);
      fetchEvents(); // Refresh events
      alert('Successfully unregistered from event');
    } catch (err) {
      alert(err.message || 'Unregistration failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Register for exciting tech events, workshops, and hackathons
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex gap-4 border-b border-white/10">
          {['all', 'upcoming', 'ongoing', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 font-semibold capitalize transition-all ${
                filter === status
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-xl">No events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const isRegistered = event.registeredUsers?.includes(user?.id);
              const isFull = event.registeredUsers?.length >= event.capacity;

              return (
                <div
                  key={event._id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        event.status === 'upcoming' ? 'bg-cyan-500' :
                        event.status === 'ongoing' ? 'bg-green-500' :
                        'bg-slate-500'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-300 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🕐</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥</span>
                        <span>
                          {event.registeredUsers?.length || 0} / {event.capacity} registered
                        </span>
                      </div>
                    </div>

                    {/* Registration Button */}
                    {isRegistered ? (
                      <button
                        onClick={() => handleUnregister(event._id)}
                        className="w-full py-3 bg-red-500/20 border border-red-500 text-red-400 font-semibold rounded-xl hover:bg-red-500/30 transition-all"
                      >
                        Unregister
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(event._id)}
                        disabled={isFull}
                        className={`w-full py-3 font-semibold rounded-xl transition-all ${
                          isFull
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-400/50'
                        }`}
                      >
                        {isFull ? 'Event Full' : 'Register Now'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;