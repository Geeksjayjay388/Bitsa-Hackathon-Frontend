import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';

function MainContainer() {
  const [isVisible, setIsVisible] = useState(false);
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    setIsVisible(true);
    
    const newStars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 25,
      size: 1 + Math.random() * 3.5,
      opacity: 0.2 + Math.random() * 0.8,
    }));
    setStars(newStars);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <Navbar />
      
      <div className="relative w-full min-h-screen overflow-hidden bg-black">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, ${star.opacity * 0.8})`,
              animation: `movingStar ${star.duration}s linear infinite`,
              animationDelay: `${star.delay}s`,
            }}
          ></div>
        ))}

        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(0deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <div className={`text-center transition-all duration-1000 max-w-7xl mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <div className="mb-8 inline-block animate-[fadeIn_0.8s_ease-out]">
              <div className="px-8 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 rounded-full shadow-lg shadow-cyan-400/10">
                <p className="text-cyan-300 text-sm font-semibold tracking-widest">WELCOME TO THE OFFICIAL BITSA WEBSITE</p>
              </div>
            </div>

            <div className="mb-12">
              <h1 className="text-8xl md:text-[11rem] font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-8 tracking-tighter leading-none drop-shadow-2xl animate-[fadeInScale_1s_ease-out]" style={{ textShadow: '0 0 80px rgba(34,211,238,0.3)' }}>
                B I T S A
              </h1>
              <div className="w-40 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-10 animate-pulse"></div>
            </div>

            <div className="mb-14 max-w-3xl mx-auto animate-[fadeIn_1s_ease-out_0.3s_both]">
              <p className="text-3xl md:text-5xl text-white font-bold tracking-tight mb-6 leading-tight">
                Information Systems & Computing Community
              </p>
              <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                Empowering students in IS & Computing to innovate, collaborate,<br />
                and build the next generation of digital solutions
              </p>
            </div>
            
            <div className="mb-20 animate-[fadeIn_1s_ease-out_0.5s_both]">
              <Link to="/signup">
              <button className="group relative px-14 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-105 active:scale-95">
                <span className="relative z-10 tracking-wide">JOIN THE COMMUNITY</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>
              </button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 mb-24 animate-[fadeIn_1s_ease-out_0.7s_both]">
              {['Database Systems', 'Software Development', 'Systems Analysis', 'Web Technologies'].map((feature, index) => (
                <div 
                  key={feature}
                  className="flex items-center px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 group-hover:animate-pulse"></div>
                  <p className="text-slate-300 text-base font-medium group-hover:text-cyan-400 transition-colors">{feature}</p>
                </div>
              ))}
            </div>

            <div className="w-full mb-16 animate-[fadeIn_1s_ease-out_0.9s_both]">
              <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-7xl mx-auto">
                
                <div className="flex-1 group relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-3xl transition-all duration-500"></div>
                  <div className="relative flex flex-col items-center text-center h-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-400/20">
                      <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Innovation</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                      Foster creativity and breakthrough thinking through collaborative projects and hackathons
                    </p>
                  </div>
                </div>

                <div className="flex-1 group relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:border-blue-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 rounded-3xl transition-all duration-500"></div>
                  <div className="relative flex flex-col items-center text-center h-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-400/20">
                      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Learning</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                      Expand your skills with workshops, mentorship programs, and hands-on tech experiences
                    </p>
                  </div>
                </div>

                <div className="flex-1 group relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:border-indigo-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-400/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-3xl transition-all duration-500"></div>
                  <div className="relative flex flex-col items-center text-center h-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-400/20">
                      <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">Community</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                      Build lasting connections with like-minded tech enthusiasts and future industry leaders
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-7 h-12 border-2 border-cyan-400/60 rounded-full flex justify-center shadow-lg shadow-cyan-400/20">
                <div className="w-1.5 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Learn Section */}
        <div className="relative z-10 px-6 py-20 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 backdrop-blur-md rounded-xl" />

          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 rounded-full mb-6">
              <p className="text-cyan-300 text-sm font-semibold tracking-widest">COMPREHENSIVE CURRICULUM</p>
            </div>
            <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl mb-6">
              What You'll Learn
            </h2>
            <p className="text-lg leading-8 text-slate-400 max-w-3xl mx-auto">
              Master cutting-edge technologies and build real-world skills that prepare you for a successful career in Information Systems and Computing.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-8"></div>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Database Systems",
                description: "Master SQL, NoSQL, and database design principles. Learn to build scalable data solutions.",
                icon: (props) => (
                  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                )
              },
              {
                name: "Software Development",
                description: "Build real-world applications using modern frameworks, best practices, and agile methodologies.",
                icon: (props) => (
                  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )
              },
              {
                name: "Systems Analysis",
                description: "Learn to analyze business requirements and design efficient information systems solutions.",
                icon: (props) => (
                  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                name: "Web Technologies",
                description: "Create dynamic web applications with HTML, CSS, JavaScript, and modern frontend frameworks.",
                icon: (props) => (
                  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )
              },
              {
                name: "Cloud Computing",
                description: "Explore cloud platforms, serverless architecture, and scalable infrastructure solutions.",
                icon: (props) => (
                  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                )
              },
              {
                name: "Cybersecurity",
                description: "Understand security principles, encryption, and how to protect systems from vulnerabilities.",
                icon: (props) => (
                  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div 
                key={feature.name} 
                className="group flex flex-col items-start rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/10 p-8 shadow-lg transition-all duration-500 hover:scale-105 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/20"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-3xl transition-all duration-500 pointer-events-none"></div>
                
                <div className="relative w-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" aria-hidden="true" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center text-cyan-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="mr-2">Learn more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes movingStar {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(-100vw, 100vh);
            }
          }
          
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

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes expand {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }
        `}</style>
      </div>
      <Footer />
    </main>
  );
}

export default MainContainer;