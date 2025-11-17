import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogsAPI } from '../services/api';
import { Calendar, Clock, User, ArrowLeft, Share2, BookmarkPlus, Tag } from 'lucide-react';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  const fetchBlogDetail = async () => {
    try {
      const response = await blogsAPI.getById(id);
      setBlog(response.data);
      
      // Fetch related posts
      const allBlogs = await blogsAPI.getAll();
      const related = allBlogs.data
        .filter(post => post._id !== id && post.category === response.data.category)
        .slice(0, 3);
      setRelatedPosts(related);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-slate-300">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <Navbar />
        <div className="text-center">
          <p className="text-slate-300 text-xl mb-4">Blog not found</p>
          <button 
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
          >
            Back to Blogs
          </button>
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
      </div>

      <div className="relative z-10 px-6 py-12">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <button 
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors duration-300 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Blogs</span>
          </button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="mb-6">
            <span className={`inline-block px-6 py-2 bg-gradient-to-r ${getTagColor(blog.category)} text-white text-sm font-bold rounded-full shadow-lg`}>
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                {(blog.author || 'B').charAt(0)}
              </div>
              <div>
                <p className="text-white font-bold">{blog.author || 'BITSA Team'}</p>
                <p className="text-slate-300 text-sm">{blog.authorRole || 'Content Creator'}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-slate-300 text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={18} className="text-cyan-400" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={18} className="text-blue-400" />
                {blog.readTime || '5 min read'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-12">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300">
              <Share2 size={18} />
              Share
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-blue-500 hover:border-blue-500 transition-all duration-300">
              <BookmarkPlus size={18} />
              Save
            </button>
          </div>

          {/* Featured Image */}
          {blog.imageUrl && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img 
                src={blog.imageUrl} 
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-16">
            <div className="text-slate-200 leading-relaxed space-y-6">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-12 pb-12 border-b border-white/20">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag size={20} className="text-cyan-400" />
                {blog.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white/10 border border-white/20 text-slate-300 text-sm font-semibold rounded-full hover:bg-cyan-500/20 hover:border-cyan-500 transition-all cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-black text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <div 
                    key={post._id}
                    onClick={() => navigate(`/blog/${post._id}`)}
                    className="group bg-white/8 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:border-cyan-400/60 transition-all duration-500 cursor-pointer hover:scale-105"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={post.imageUrl || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4">
                      <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getTagColor(post.category)} text-white text-xs font-bold rounded-full mb-3`}>
                        {post.category}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <Footer />
    </div>
  );
}

export default BlogDetail;