import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contacts" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-110">
              <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                B
              </span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              BITSA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-300 hover:text-cyan-400 font-semibold transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                                {/* User Profile Button with Visible Name */}
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="group flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-2xl hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
                >
                  {/* Avatar with gradient border */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  {/* Name */}
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{user?.name}</span>
                    <svg
                      className={`w-4 h-4 text-cyan-400 transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Enhanced Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-slate-900/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
                    {/* User Info Header */}
                    <div className="p-5 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-b border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                          {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">{user?.name}</p>
                          <p className="text-cyan-400 text-sm">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="p-2">
                      {isAdmin() && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="group flex items-center gap-3 px-4 py-3 text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all duration-200 mb-1"
                        >
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                            <span className="text-lg">🔧</span>
                          </div>
                          <div>
                            <p className="font-bold">Admin Dashboard</p>
                            <p className="text-xs text-purple-300/70">Manage content</p>
                          </div>
                        </Link>
                      )}

                      <Link
                        to="/events"
                        onClick={() => setDropdownOpen(false)}
                        className="group flex items-center gap-3 px-4 py-3 text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all duration-200 mb-1"
                      >
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                          
                        </div>
                        <div>
                          <p className="font-bold">My Events</p>
                          <p className="text-xs text-cyan-300/70">View registrations</p>
                        </div>
                      </Link>

                      <div className="my-2 border-t border-white/10"></div>

                      <button
                        onClick={handleLogout}
                        className="group w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                      >
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                          
                        </div>
                        <div className="text-left">
                          <p className="font-bold">Logout</p>
                          <p className="text-xs text-red-300/70">Sign out of account</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all hover:shadow-lg hover:shadow-cyan-400/50"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10 animate-fadeIn">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-300 hover:text-cyan-400 font-semibold transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t border-white/10 pt-4 mt-2">
                {isAuthenticated ? (
                  <>
                    {/* Mobile User Card */}
                    <div className="mb-4 p-4 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                          {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-bold">{user?.name}</p>
                          <p className="text-cyan-400 text-sm">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    {isAdmin() && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 mb-2 px-4 py-3 text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-xl font-semibold hover:bg-purple-500/20 transition-all"
                      >
                        <span className="text-lg">🔧</span>
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <Link
                      to="/events"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 mb-2 px-4 py-3 text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-xl font-semibold hover:bg-cyan-500/20 transition-all"
                    >
                      <span className="text-lg">📅</span>
                      <span>My Events</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-semibold hover:bg-red-500/20 transition-all"
                    >
                      <span className="text-lg">🚪</span>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block mb-2 px-6 py-2 text-center text-cyan-400 border border-cyan-400 rounded-xl font-bold"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block px-6 py-2 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;