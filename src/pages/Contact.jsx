import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { feedbackAPI } from '../services/api';
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false); // Add this
  const [error, setError] = useState(''); // Add this

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    await feedbackAPI.submit(formData);
    alert('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (err) {
    setError(err.message || 'Failed to send message. Please try again.');
    console.error('Feedback submission error:', err);
  } finally {
    setLoading(false);
  }
};

  const contactInfo = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      details: "info@bitsa.com",
      subtext: "We'll respond within 24 hours",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Visit Us",
      details: "Main Campus, Information Systems Dept.",
      subtext: "Kapsabet, Kenya",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      details: "+254 712 345 678",
      subtext: "Mon-Fri, 9AM-5PM",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Live Chat",
      details: "Chat with support",
      subtext: "Available 24/7",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const socialLinks = [
    {
      name: "Twitter",
      icon: "𝕏",
      link: "#",
      color: "hover:bg-cyan-500"
    },
    {
      name: "LinkedIn",
      icon: "in",
      link: "#",
      color: "hover:bg-blue-500"
    },
    {
      name: "GitHub",
      icon: "G",
      link: "#",
      color: "hover:bg-slate-700"
    },
    {
      name: "Instagram",
      icon: "IG",
      link: "#",
      color: "hover:bg-pink-500"
    },
    {
      name: "Discord",
      icon: "D",
      link: "#",
      color: "hover:bg-indigo-500"
    }
  ];

  const faqs = [
    {
      question: "How can I join BITSA?",
      answer: "You can join by filling out the membership form on our website or attending one of our events."
    },
    {
      question: "Are there any membership fees?",
      answer: "BITSA membership is free for all Information Systems and Computing students."
    },
    {
      question: "How often do you organize events?",
      answer: "We organize events monthly, including workshops, hackathons, and networking sessions."
    }
  ];

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
        <div className="max-w-7xl mx-auto mb-20 text-center">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 rounded-full mb-6">
            <p className="text-cyan-300 text-sm font-semibold tracking-widest">GET IN TOUCH</p>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Have questions or want to get involved? We'd love to hear from you. Reach out and let's connect!
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-8"></div>
        </div>

        {/* Contact Info Cards */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/20 cursor-pointer"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} bg-opacity-20 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform`}>
                  {info.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {info.title}
                </h3>
                <p className="text-slate-300 font-semibold mb-1">{info.details}</p>
                <p className="text-slate-500 text-sm">{info.subtext}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Form and Map */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:border-cyan-400/50 transition-all duration-500">
              <h2 className="text-3xl font-black text-white mb-3">Send us a Message</h2>
              <p className="text-slate-400 mb-8">Fill out the form below and we'll get back to you soon.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-300 font-semibold mb-2 text-sm">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                    placeholder="Enter Full Name here"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-2 text-sm">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                    placeholder="name@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-2 text-sm">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-2 text-sm">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
  type="submit"
  disabled={loading}
  className="group w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>Sending...</span>
    </>
  ) : (
    <>
      <span>Send Message</span>
      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </>
  )}
</button>
              </form>
            </div>

            {/* Map / Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden h-80 hover:border-cyan-400/50 transition-all duration-500">
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 mx-auto mb-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-slate-400 font-semibold">Find us on Campus</p>
                    <p className="text-slate-500 text-sm mt-2">Main Campus, Building A</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500">
                <h3 className="text-2xl font-black text-white mb-4">Follow Us</h3>
                <p className="text-slate-400 mb-6">Stay connected on social media</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold transition-all duration-300 ${social.color} hover:border-transparent hover:scale-110 hover:shadow-lg group`}
                      title={social.name}
                    >
                      <span className="text-sm">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500">
                <h3 className="text-2xl font-black text-white mb-4">Office Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-semibold">Monday - Friday</span>
                    <span className="text-cyan-400 font-bold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-semibold">Saturday</span>
                    <span className="text-cyan-400 font-bold">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-semibold">Sunday</span>
                    <span className="text-slate-500 font-bold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <h3 className="text-xl font-bold text-white mb-2 flex items-start gap-3">
                  <span className="text-cyan-400 text-2xl">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-slate-400 pl-8">{faq.answer}</p>
              </div>
            ))}
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
      `}</style>
      <Footer />
    </div>
  );
}

export default Contact;