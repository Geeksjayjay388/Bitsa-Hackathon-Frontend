import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';

function Events() {
  const events = [
    {
      id: 1,
      title: "Annual Hackathon 2024",
      description: "Join us for 48 hours of intensive coding, innovation, and collaboration. Build groundbreaking solutions, compete for amazing prizes, and network with industry professionals.",
      date: "December 15-17, 2024",
      time: "9:00 AM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      category: "Competition",
      location: "Main Campus Auditorium"
    },
    {
      id: 2,
      title: "Cloud Computing Workshop",
      description: "Learn the fundamentals of AWS, Azure, and Google Cloud Platform. Hands-on session covering serverless architecture, containerization, and cloud deployment strategies.",
      date: "December 20, 2024",
      time: "2:00 PM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      category: "Workshop",
      location: "Computer Lab 3"
    },
    {
      id: 3,
      title: "Tech Career Fair",
      description: "Meet recruiters from top tech companies. Explore internship and job opportunities, attend career talks, and get your resume reviewed by industry experts.",
      date: "January 10, 2025",
      time: "10:00 AM - 4:00 PM",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      category: "Networking",
      location: "University Hall"
    },
    {
      id: 4,
      title: "AI & Machine Learning Seminar",
      description: "Discover the latest trends in artificial intelligence and machine learning. Expert speakers will cover neural networks, deep learning, and practical AI applications.",
      date: "January 18, 2025",
      time: "3:00 PM - 5:30 PM",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      category: "Seminar",
      location: "Lecture Hall A"
    },
    {
      id: 5,
      title: "Database Design Bootcamp",
      description: "Master database design principles, normalization, and query optimization. Hands-on practice with SQL, NoSQL, and modern database management systems.",
      date: "January 25, 2025",
      time: "1:00 PM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
      category: "Workshop",
      location: "Computer Lab 1"
    },
    {
      id: 6,
      title: "Cybersecurity Awareness Day",
      description: "Learn how to protect yourself and your systems from cyber threats. Topics include encryption, network security, ethical hacking, and best security practices.",
      date: "February 5, 2025",
      time: "11:00 AM - 3:00 PM",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      category: "Seminar",
      location: "Main Auditorium"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Competition: 'from-cyan-500 to-blue-500',
      Workshop: 'from-blue-500 to-indigo-500',
      Networking: 'from-indigo-500 to-purple-500',
      Seminar: 'from-purple-500 to-pink-500'
    };
    return colors[category] || 'from-cyan-500 to-blue-500';
  };

  return (
    <div className="min-h-screen bg-black text-white">
        <Navbar />
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 px-6 py-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 rounded-full mb-6">
            <p className="text-cyan-300 text-sm font-semibold tracking-widest">UPCOMING EVENTS</p>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6">
            Join Our Events
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Discover exciting opportunities to learn, network, and grow with BITSA. From workshops to hackathons, there's something for everyone.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-8"></div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div 
              key={event.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500 hover:scale-105"
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(event.category)} text-white text-xs font-bold rounded-full shadow-lg`}>
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Date & Time */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-semibold">{event.location}</span>
                  </div>
                </div>

                {/* Register Button */}
                <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 group-hover:scale-105">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
      `}</style>
        <Footer />  
    </div>
  );
}

export default Events;