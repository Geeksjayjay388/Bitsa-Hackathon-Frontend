import React from 'react';

function Footer() {
  return (
    <footer className="relative z-10 bg-black text-white overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Moving gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

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

      {/* Main Footer Content */}
      <div className="relative px-6 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Section - Brand and CTA */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 pb-12 border-b border-white/5">
            <div className="mb-8 md:mb-0">
              <h3 className="text-5xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-300 inline-block cursor-pointer">
                BITSA
              </h3>
              <p className="text-slate-400 text-lg max-w-md">
                Empowering the next generation of tech leaders in Information Systems & Computing
              </p>
            </div>
            
            {/* Newsletter */}
           {/* Newsletter */}
            <div className="text-center md:text-right w-full md:w-auto">
              <h4 className="text-2xl font-bold text-white mb-3">Join Our Community</h4>
              <p className="text-slate-400 text-sm mb-4 max-w-md mx-auto md:mx-0">
                Subscribe for updates on events, workshops, and opportunities
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 w-full sm:min-w-[250px]"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Middle Section - Horizontal Links with Graphics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            {/* Quick Links */}
            <div className="group">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg">Quick Links</h4>
              </div>
              <ul className="space-y-2">
                {['About Us', 'Events', 'Projects', 'Gallery'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center group/link">
                      <span className="w-0 group-hover/link:w-2 h-0.5 bg-cyan-400 mr-0 group-hover/link:mr-2 transition-all duration-300"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="group">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg">Resources</h4>
              </div>
              <ul className="space-y-2">
                {['Documentation', 'Tutorials', 'Community', 'Support'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center group/link">
                      <span className="w-0 group-hover/link:w-2 h-0.5 bg-cyan-400 mr-0 group-hover/link:mr-2 transition-all duration-300"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div className="group">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg">Community</h4>
              </div>
              <ul className="space-y-2">
                {['Members', 'Partners', 'Alumni', 'Mentors'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center group/link">
                      <span className="w-0 group-hover/link:w-2 h-0.5 bg-cyan-400 mr-0 group-hover/link:mr-2 transition-all duration-300"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="group">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg">Contact</h4>
              </div>
              <ul className="space-y-2">
                {['Email Us', 'Location', 'Phone', 'FAQs'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center group/link">
                      <span className="w-0 group-hover/link:w-2 h-0.5 bg-cyan-400 mr-0 group-hover/link:mr-2 transition-all duration-300"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className="group">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg">Follow Us</h4>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['𝕏', 'in', 'G', 'IG', 'D', 'YT'].map((icon, i) => (
                  <a 
                    key={i}
                    href="#" 
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-400/20 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                  >
                    <span className="font-bold text-xs">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-slate-500 text-sm">
                <span>© {new Date().getFullYear()} BITSA</span>
                <span className="hidden md:inline">•</span>
                <span className="text-slate-600">All rights reserved</span>
              </div>
              <div className="flex items-center gap-6">
                {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link, index) => (
                  <React.Fragment key={link}>
                    <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">
                      {link}
                    </a>
                    {index < 2 && <span className="text-slate-700 hidden md:inline">•</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <span>Made with</span>
                <span className="text-red-500 animate-pulse">❤️</span>
                <span>by BITSA Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
    </footer>
  );
}

export default Footer;