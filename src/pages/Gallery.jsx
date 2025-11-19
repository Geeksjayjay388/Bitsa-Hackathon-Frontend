import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';
import { galleryAPI } from '../services/api';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ['All', 'Hackathons', 'Workshops', 'Events', 'Team'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await galleryAPI.getAll();
      setImages(response.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <Navbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <Navbar/>
      
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
            <p className="text-cyan-300 text-sm font-semibold tracking-widest">MEMORIES & MOMENTS</p>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6">
            Our Gallery
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Explore our journey through pictures. From hackathons to workshops, every moment captured tells a story of innovation and community.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-8"></div>
        </div>

        {/* Category Filter */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-400/50 scale-105'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {images.length === 0 ? (
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
              <svg className="w-24 h-24 mx-auto mb-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-black text-white mb-2">No Images Yet</h3>
              <p className="text-slate-400">Check back soon for amazing moments!</p>
            </div>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => {
                  const isLarge = index % 5 === 0;
                  const isTall = index % 7 === 0;
                  
                  return (
                    <div
                      key={image._id}
                      onClick={() => openModal(image, index)}
                      className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:scale-105 hover:z-10 ${
                        isLarge ? 'md:col-span-2 md:row-span-2' : isTall ? 'md:row-span-2' : ''
                      }`}
                      style={{ 
                        animation: `fadeInScale 0.6s ease-out ${index * 0.05}s both`,
                        minHeight: isLarge ? '500px' : isTall ? '450px' : '300px'
                      }}
                    >
                      {/* Image */}
                      <img
                        src={image.image?.url || image.imageUrl || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        {/* Category Badge */}
                        <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs font-bold">
                            {image.category}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl font-black mb-2 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                          {image.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                          {image.description}
                        </p>
                        
                        {/* View Icon */}
                        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-cyan-500 hover:scale-110">
                          <ZoomIn className="w-6 h-6" />
                        </div>
                      </div>
                      
                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-14 h-14 bg-white/10 hover:bg-red-500 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-6 w-14 h-14 bg-white/10 hover:bg-cyan-500 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-6 w-14 h-14 bg-white/10 hover:bg-cyan-500 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full z-50">
            <span className="text-white font-semibold text-sm">
              {currentIndex + 1} / {filteredImages.length}
            </span>
          </div>

          {/* Modal Content */}
          <div className="relative max-w-7xl max-h-[90vh] mx-4 flex flex-col lg:flex-row gap-6 items-center">
            {/* Image Container */}
            <div className="relative flex-1 max-w-4xl">
              <img
                src={selectedImage.image?.url || selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-scaleIn"
              />
            </div>

            {/* Image Details */}
            <div className="w-full lg:w-96 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl animate-slideInRight">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-bold text-white">
                  {selectedImage.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-black text-white mb-4">
                {selectedImage.title}
              </h2>

              {/* Description */}
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {selectedImage.description || "No description available."}
              </p>

              {/* Additional Info */}
              {selectedImage.date && (
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                </div>
              )}

              {/* Decorative gradient */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-tl-full"></div>
            </div>
          </div>
        </div>
      )}

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out;
        }
      `}</style>
      <Footer/>
    </div>
  );
}

export default Gallery;