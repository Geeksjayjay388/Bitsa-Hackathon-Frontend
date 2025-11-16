import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogsAPI } from '../services/api';
import { BookOpen, Calendar, Clock, User, Star, TrendingUp, Award } from 'lucide-react';

function Blog() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const tags = ['All', 'Tech Trends', 'Tutorials', 'Career Advice', 'Community'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogsAPI.getAll();
      setBlogPosts(response.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedTag === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.tag === selectedTag);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const getTagColor = (tag) => {
    const colors = {
      'Tech Trends': 'from-cyan-500 to-blue-500',
      'Tutorials': 'from-blue-500 to-indigo-500',
      'Career Advice': 'from-indigo-500 to-purple-500',
      'Community': 'from-purple-500 to-pink-500',
      'tutorial': 'from-blue-500 to-indigo-500',
      'article': 'from-cyan-500 to-blue-500',
      'news': 'from-purple-500 to-pink-500',
      'guide': 'from-indigo-500 to-purple-500'
    };
    return colors[tag] || 'from-cyan-500 to-blue-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <Navbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading blogs...</p>
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
      </div>

      <div className="relative z-10 px-6 py-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-400/40 rounded-full mb-6">
            <p className="text-cyan-300 text-sm font-semibold tracking-widest">INSIGHTS & STORIES</p>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6">
            BITSA Blog
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Discover the latest in tech, learn from tutorials, get career advice, and stay connected with the BITSA community.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-8"></div>
        </div>

        {/* Tag Filter */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-400/50 scale-105'
                    : 'bg-white/10 text-slate-200 border border-white/20 hover:bg-white/15 hover:border-cyan-400/60'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {blogPosts.length === 0 ? (
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="bg-white/8 backdrop-blur-sm border border-white/20 rounded-3xl p-12">
              <BookOpen className="w-24 h-24 mx-auto mb-6 text-slate-400" strokeWidth={1.5} />
              <h3 className="text-2xl font-black text-white mb-2">No Blogs Yet</h3>
              <p className="text-slate-300">Check back soon for exciting content!</p>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {selectedTag === 'All' && featuredPost && (
              <div className="max-w-7xl mx-auto mb-20">
                <div className="relative group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/30">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Image */}
                    <div className="relative h-80 md:h-full rounded-2xl overflow-hidden">
                      <img 
                        src={featuredPost.imageUrl || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"} 
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-2">
                          <Star size={16} fill="currentColor" />
                          Featured
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="mb-4">
                        <span className={`px-4 py-2 bg-gradient-to-r ${getTagColor(featuredPost.category)} text-white text-sm font-bold rounded-full`}>
                          {featuredPost.category}
                        </span>
                      </div>
                      <h2 className="text-4xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        {featuredPost.excerpt || featuredPost.content?.substring(0, 200) + '...'}
                      </p>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                          {(featuredPost.author || 'B').charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold">{featuredPost.author || 'BITSA Team'}</p>
                          <p className="text-slate-300 text-sm">{featuredPost.authorRole || 'Content Creator'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-slate-300 text-sm mb-6">
                        <span className="flex items-center gap-2">
                          <Calendar size={18} className="text-cyan-400" />
                          {new Date(featuredPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={18} className="text-blue-400" />
                          {featuredPost.readTime || '5 min read'}
                        </span>
                      </div>
                      <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 group-hover:scale-105">
                        Read Full Article
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Posts Grid */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <div 
                    key={post._id}
                    className="group bg-white/8 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/30"
                    style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={post.imageUrl || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className={`px-4 py-1 bg-gradient-to-r ${getTagColor(post.category)} text-white text-xs font-bold rounded-full`}>
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt || post.content?.substring(0, 150) + '...'}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/20">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                          {(post.author || 'B').charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{post.author || 'BITSA Team'}</p>
                          <p className="text-slate-300 text-xs">{post.authorRole || 'Content Creator'}</p>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-slate-300 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-cyan-400" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-blue-400" />
                          {post.readTime || '5 min read'}
                        </span>
                      </div>

                      <button className="w-full mt-4 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300 group-hover:scale-105">
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 backdrop-blur-xl border border-cyan-400/40 p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
            <div className="relative">
              <TrendingUp size={48} className="mx-auto mb-4 text-cyan-400" />
              <h3 className="text-3xl font-black text-white mb-4">Never Miss a Post</h3>
              <p className="text-slate-300 mb-8">Subscribe to our newsletter and get the latest tech insights delivered to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/30 rounded-full text-white placeholder-slate-300 focus:outline-none focus:border-cyan-400/50 transition-all backdrop-blur-sm"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105">
                  Subscribe
                </button>
              </div>
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <Footer/>
    </div>
  );
}

export default Blog;