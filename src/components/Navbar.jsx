import { useState } from 'react';
import { Link } from 'react-router-dom';  // ✅ Import Link

function Navbar() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Us', path: '/about' },
    { name: 'Contacts', path: '/contacts' },
  ];

  return (
    <main className="text-white backdrop-blur-md pt-4">
      <nav className="w-full backdrop-blur-xl border-white/10 shadow-2xl px-8 py-4 animate-[slideDown_0.6s_ease-out]">
        <div className="max-w-[98%] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Section */}
          <section className="flex-shrink-0">
            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent tracking-tight animate-[fadeIn_0.8s_ease-out] hover:scale-105 transition-transform duration-300 cursor-pointer">
              BITSA
            </h1>
          </section>

          {/* Navigation Links */}
          <section className="flex justify-center ml-7">
            <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md rounded-full px-10 py-3 border border-cyan-400/30 shadow-[0_4px_24px_0_rgba(34,211,238,0.2)]">
              <ul className="flex items-center gap-14">
                {navItems.map((item, index) => (
                  <li
                    key={item.name}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative text-[1.1rem] font-semibold cursor-pointer transition-all duration-300 whitespace-nowrap ${
                      hoveredItem === item.name ? 'text-cyan-400' : 'text-slate-300'
                    }`}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                      transform: hoveredItem === item.name ? 'translateY(-2px)' : 'translateY(0)'
                    }}
                  >
                    {/* ✅ Link instead of plain text */}
                    <Link to={item.path}>
                      {item.name}
                    </Link>
                    
                    {hoveredItem === item.name && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-[expand_0.3s_ease-out] shadow-lg shadow-cyan-400/50" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Auth Buttons */}
          <section className="flex items-center gap-3 animate-[fadeIn_0.8s_ease-out]">
            <Link to="/login">
              <button className="relative px-7 py-3 text-sm font-semibold text-white overflow-hidden group rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95">
                <span className="relative z-10">Log In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
            <Link to="/signup">
              <button className="relative px-7 py-3 text-sm font-bold text-black overflow-hidden group rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:scale-105 active:scale-95">
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>
              </button>
            </Link>
          </section>
        </div>
      </nav>
    </main>
  );
}

export default Navbar;
