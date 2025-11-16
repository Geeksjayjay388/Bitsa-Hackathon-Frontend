import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, GraduationCap, Trophy, Globe } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    course: '',
    year: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!formData.course) {
      setError('Please select your course');
      return;
    }

    if (!formData.year) {
      setError('Please select your year');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const result = await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        course: formData.course,
        year: parseInt(formData.year)
      });

      if (result.success) {
        navigate('/events');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
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

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding */}
          <div className="hidden lg:block animate-[fadeInLeft_0.8s_ease-out]">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <Link to="/" className="inline-block mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">B</span>
                    </div>
                    <div>
                      <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        BITSA
                      </h1>
                      <p className="text-slate-400 text-sm font-semibold">Tech Community</p>
                    </div>
                  </div>
                </Link>
                
                <h2 className="text-5xl font-black text-white mb-6 leading-tight">
                  Join the<br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">BITSA Community</span>
                </h2>
                
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Create your account and unlock access to exclusive events, workshops, hackathons, and networking opportunities with fellow tech enthusiasts.
                </p>

                {/* Benefits */}
                <div className="space-y-4">
                  {[
                    { icon: Sparkles, text: 'Free membership for all students' },
                    { icon: GraduationCap, text: 'Access to premium workshops' },
                    { icon: Trophy, text: 'Participate in hackathons' },
                    { icon: Globe, text: 'Connect with industry leaders' }
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <benefit.icon className="text-cyan-400" size={20} />
                      </div>
                      <span className="text-slate-300 font-semibold">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="animate-[fadeInRight_0.8s_ease-out]">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:border-cyan-400/50 transition-all duration-500 shadow-2xl max-h-[90vh] overflow-y-auto">
              
              {/* Mobile Logo */}
              <div className="lg:hidden text-center mb-8">
                <Link to="/" className="inline-block">
                  <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                    BITSA
                  </h1>
                  <p className="text-slate-400 text-sm">Create Account</p>
                </Link>
              </div>

              <h3 className="text-3xl font-black text-white mb-2">Create Account</h3>
              <p className="text-slate-400 mb-8">Join BITSA and start your tech journey today</p>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-shake">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-400 text-sm font-semibold">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-2 text-sm">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-2 text-sm">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Course & Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">Course</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                    >
                      <option value="" className="bg-slate-900">Select</option>
                      <option value="IS" className="bg-slate-900">Information Systems</option>
                      <option value="CS" className="bg-slate-900">Computer Science</option>
                      <option value="IT" className="bg-slate-900">Information Technology</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">Year</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                    >
                      <option value="" className="bg-slate-900">Select</option>
                      <option value="1" className="bg-slate-900">Year 1</option>
                      <option value="2" className="bg-slate-900">Year 2</option>
                      <option value="3" className="bg-slate-900">Year 3</option>
                      <option value="4" className="bg-slate-900">Year 4</option>
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-2 text-sm">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-2 text-sm">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 rounded bg-white/5 border border-white/10 text-cyan-500 mt-0.5 cursor-pointer"
                  />
                  <label className="ml-3 text-slate-300 text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-cyan-400 font-semibold hover:text-cyan-300">Terms & Conditions</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-cyan-400 font-semibold hover:text-cyan-300">Privacy Policy</Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-slate-400 font-semibold">Or sign up with</span>
                  </div>
                </div>

                {/* Social Sign Up */}
                <div className="grid grid-cols-3 gap-3">
                  {['Google', 'GitHub', 'LinkedIn'].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      className="py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 text-slate-300 font-semibold text-sm"
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </form>

              {/* Login Link */}
              <p className="mt-8 text-center text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}

export default SignUp