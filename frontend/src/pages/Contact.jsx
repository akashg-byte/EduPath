import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', query: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      const res = await submitContactForm(formData);
      setStatus({ type: 'success', message: res.message });
      setFormData({ name: '', mobile: '', email: '', query: '' });
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to submit enquiry. Please try again.';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    background: '#fff',
    border: '1px solid var(--glass-border)',
    borderRadius: '0.75rem',
    color: 'var(--text-main)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'var(--transition)'
  };

  return (
    <div className="contact-page">
      <section>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">Get in Touch</h1>
            <p className="section-subtitle">
              Have questions about admissions, courses, or scholarships? Our dedicated team is here to help you.
            </p>
          </motion.div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'start' }}>
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card"
            >
              <h2 style={{ marginBottom: '2rem', color: 'white' }}>Contact Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Campus Address</h4>
                  <p style={{ color: 'var(--text-dim)' }}>123 Education Lane, Knowledge Park, City - 400001</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Email Us</h4>
                  <p style={{ color: 'var(--text-dim)' }}>
                    <a href="mailto:admissions@college.edu.in" style={{ color: 'inherit', textDecoration: 'none' }}>admissions@college.edu.in</a><br/>
                    <a href="mailto:info@college.edu.in" style={{ color: 'inherit', textDecoration: 'none' }}>info@college.edu.in</a>
                  </p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Call Us</h4>
                  <p style={{ color: 'var(--text-dim)' }}>
                    <a href="tel:+919876543210" style={{ color: 'inherit', textDecoration: 'none' }}>+91 98765 43210</a><br/>
                    <a href="tel:+912212345678" style={{ color: 'inherit', textDecoration: 'none' }}>+91 22 1234 5678</a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card"
            >
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>Full Name</label>
                  <input 
                    type="text" 
                    required
                    style={inputStyle}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    style={inputStyle}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    value={formData.mobile}
                    onChange={e => setFormData({...formData, mobile: e.target.value})}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>Email Address</label>
                  <input 
                    type="email" 
                    required
                    style={inputStyle}
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>Your Message</label>
                  <textarea 
                    rows="5"
                    required
                    style={{ ...inputStyle, resize: 'none' }}
                    placeholder="How can we help you?"
                    value={formData.query}
                    onChange={e => setFormData({...formData, query: e.target.value})}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Sending...' : 'Submit Admission Enquiry'}
                </button>

                <AnimatePresence>
                  {status.message && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ 
                        textAlign: 'center', 
                        padding: '1rem', 
                        borderRadius: '0.5rem',
                        fontSize: '0.9rem',
                        background: status.type === 'success' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: status.type === 'success' ? 'var(--accent)' : '#ef4444',
                        border: `1px solid ${status.type === 'success' ? 'var(--accent)' : '#ef4444'}`
                      }}
                    >
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
