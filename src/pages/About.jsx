import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Kamau",
      role: "President",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      bio: "Leading BITSA with vision and passion for technology innovation.",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      id: 2,
      name: "David Ochieng",
      role: "Vice President",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
      bio: "Driving community engagement and technical excellence.",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      id: 3,
      name: "Grace Mwangi",
      role: "Technical Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      bio: "Mentoring members and coordinating technical workshops.",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      id: 4,
      name: "James Kiprono",
      role: "Events Coordinator",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      bio: "Organizing hackathons and networking events.",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      id: 5,
      name: "Lucy Akinyi",
      role: "Communications",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
      bio: "Managing community outreach and social media presence.",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      id: 6,
      name: "Michael Otieno",
      role: "Treasurer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      bio: "Handling finances and partnership agreements.",
      social: { linkedin: "#", twitter: "#", github: "#" }
    }
  ];

  const milestones = [
    { year: "2018", title: "Founded", description: "BITSA was established by passionate IS students" },
    { year: "2019", title: "First Hackathon", description: "Organized our inaugural 24-hour coding marathon" },
    { year: "2020", title: "100+ Members", description: "Community grew to over 100 active members" },
    { year: "2021", title: "Industry Partnerships", description: "Partnered with 5 leading tech companies" },
    { year: "2023", title: "Annual Conference", description: "Hosted first BITSA Tech Conference" },
    { year: "2024", title: "500+ Members", description: "Reached milestone of 500+ community members" }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Innovation",
      description: "We foster creativity and encourage breakthrough thinking in technology."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community",
      description: "Building lasting connections among tech enthusiasts and industry leaders."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Learning",
      description: "Continuous skill development through workshops and hands-on experiences."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Excellence",
      description: "Striving for the highest standards in everything we do."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <Navbar />
      
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Moving gradient orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-12 sm:mb-20 text-center">
          <div className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 rounded-full mb-4 sm:mb-6">
            <p className="text-cyan-300 text-xs sm:text-sm font-semibold tracking-widest">WHO WE ARE</p>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            About BITSA
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed px-4">
            We are a community of passionate Information Systems and Computing students dedicated to fostering innovation, 
            collaboration, and excellence in technology. Together, we're building the future.
          </p>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 sm:mt-8"></div>
        </div>

        {/* Interactive Tabs Section */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-20">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            {['mission', 'vision', 'story'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-400/50 scale-105'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 hover:border-cyan-400/50 transition-all duration-500">
            {activeTab === 'mission' && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 sm:mb-6">Our Mission</h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  To empower students in Information Systems and Computing by providing a collaborative platform for learning, 
                  innovation, and professional growth. We strive to bridge the gap between academic knowledge and industry practice.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {['Educate', 'Innovate', 'Connect'].map((item, i) => (
                    <div key={item} className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-white font-bold text-base sm:text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'vision' && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 sm:mb-6">Our Vision</h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  To be the leading student technology community in East Africa, recognized for producing world-class tech 
                  professionals who drive innovation and digital transformation across industries. We envision a future where 
                  every BITSA member becomes a catalyst for technological advancement in their field.
                </p>
              </div>
            )}
            {activeTab === 'story' && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 sm:mb-6">Our Story</h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  BITSA was founded in 2018 by a group of passionate Information Systems students who saw the need for a 
                  community that goes beyond classroom learning. What started as informal study groups has grown into a 
                  thriving community of over 500 members.
                </p>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Today, we organize hackathons, workshops, career fairs, and networking events that have helped hundreds 
                  of students launch successful tech careers. Our journey continues as we expand our reach and impact.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-7xl mx-auto mb-12 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Our Core Values</h2>
            <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/20"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 sm:mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-20 px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Our Journey</h2>
            <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
          </div>
          
          {/* Mobile Timeline - Simple Cards */}
          <div className="block md:hidden space-y-6">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {milestone.year}
                </h3>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{milestone.title}</h4>
                <p className="text-slate-400 text-sm">{milestone.description}</p>
              </div>
            ))}
          </div>

          {/* Desktop Timeline - Original Cool Layout */}
          <div className="hidden md:block relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500"></div>
            
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                style={{ animation: `fadeIn 0.8s ease-out ${index * 0.2}s both` }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                    <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {milestone.year}
                    </h3>
                    <h4 className="text-xl font-bold text-white mb-2">{milestone.title}</h4>
                    <p className="text-slate-400 text-sm">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-4 border-black shadow-lg shadow-cyan-400/50"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto mb-12 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Meet Our Team</h2>
            <p className="text-slate-400 text-base sm:text-lg mb-4">The passionate leaders driving BITSA forward</p>
            <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/20"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-1">{member.name}</h3>
                    <p className="text-cyan-400 font-bold mb-2 sm:mb-3 text-sm sm:text-base">{member.role}</p>
                    <p className="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {member.bio}
                    </p>
                    <div className="flex gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {['linkedin', 'twitter', 'github'].map((social) => (
                        <a
                          key={social}
                          href={member.social[social]}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition-all"
                        >
                          <span className="text-white text-xs font-bold">{social.charAt(0).toUpperCase()}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 backdrop-blur-xl border border-cyan-400/30 p-8 sm:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">Ready to Join Us?</h3>
              <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-8">
                Be part of a community that's shaping the future of technology.
              </p>
              <button className="px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-base sm:text-lg font-bold rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-105">
                Become a Member
              </button>
            </div>
          </div>
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      
      <Footer/>
    </div>
  );
}

export default About;