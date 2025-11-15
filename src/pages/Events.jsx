import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <Navbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <Navbar />
      
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 px-6 py-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 rounded-full mb-6">
            <p className="text-cyan-300 text-sm font-semibold tracking-widest">CONNECT & LEARN</p>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6">
            Upcoming Events
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Register for exciting tech events, workshops, and hackathons. Join our community and enhance your skills.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-8"></div>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'upcoming', 'ongoing', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-8 py-3 rounded-full font-bold capitalize transition-all duration-300 ${
                  filter === status
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-400/50 scale-105'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto pb-20">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {events.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
                <svg className="w-24 h-24 mx-auto mb-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-2xl font-black text-white mb-2">No Events Found</h3>
                <p className="text-slate-400">Check back soon for exciting upcoming events!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => {
                const isRegistered = event.registeredUsers?.includes(user?.id);
                const isFull = event.registeredUsers?.length >= event.capacity;

                return (
                  <div
                    key={event._id}
                    className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/20"
                    style={{ animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both` }}
                  >
                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          event.status === 'upcoming' ? 'bg-cyan-500' :
                          event.status === 'ongoing' ? 'bg-green-500' :
                          'bg-slate-500'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-6">
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-slate-300 mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                          <span>📅</span>
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <span>🕐</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <span>📍</span>
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
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
                          className="w-full py-3 bg-red-500/20 border border-red-500 text-red-400 font-bold rounded-xl hover:bg-red-500/30 transition-all duration-300 hover:scale-105"
                        >
                          Unregister
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRegister(event._id)}
                          disabled={isFull}
                          className={`w-full py-3 font-bold rounded-xl transition-all duration-300 ${
                            isFull
                              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105'
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

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
      `}</style>
      
      <Footer />
    </div>
  );
}

export default Events;