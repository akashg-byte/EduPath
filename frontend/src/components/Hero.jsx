import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Sparkles, Search, School, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showDropdown, setShowDropdown] = React.useState(false);

  const trendingSearches = [
    { name: 'VIT University', type: 'College', location: 'Chennai' },
    { name: 'SRM Institute', type: 'College', location: 'Chennai' },
    { name: 'Computer Science', type: 'Course', location: 'Top Streams' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="hero" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      overflow: 'hidden',
      padding: '8rem 0 4rem',
      background: 'radial-gradient(circle at top right, rgba(120, 53, 15, 0.05), transparent 50%)'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ flex: '1 1 500px', maxWidth: '650px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="badge"
              style={{ marginBottom: '2rem' }}
            >
              <Sparkles size={16} className="badge-icon" />
              <span>Admissions 2026 Open for Top Colleges</span>
            </motion.div>

            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem', fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>
              Get Admission <br/>
              in your <span className="highlight">Dream College</span>
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-dim)', 
              marginBottom: '2rem', 
              lineHeight: '1.6',
            }}>
              Expert guidance for Admissions to Top Colleges in Tamil Nadu. We assist with Engineering, Medical, Arts & Science and directly connect you with premier universities.
            </p>

            {/* Robust Search Bar */}
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-wrapper">
                <Search size={20} color="var(--text-muted)" style={{ marginRight: '1rem' }} />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search Colleges, Courses or Exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                <button type="submit" className="search-btn">
                  Search
                </button>
              </form>

              {showDropdown && (
                <div className="search-dropdown">
                  <div style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--glass-border)' }}>
                    Trending Searches
                  </div>
                  {trendingSearches.map((item, idx) => (
                    <div key={idx} className="search-item" onClick={() => {
                      setSearchQuery(item.name);
                      window.location.href = `/search?q=${encodeURIComponent(item.name)}`;
                    }} style={{ background: '#fff', borderBottom: '1px solid var(--glass-border)' }}>
                      <div className="search-item-icon" style={{ background: 'var(--bg-dark)' }}>
                        {item.type === 'College' ? <School size={18} color="var(--primary)" /> : <BookOpen size={18} color="var(--primary)" />}
                      </div>
                      <div className="search-item-info">
                        <h4 style={{ color: 'var(--text-main)' }}>{item.name}</h4>
                        <p style={{ color: 'var(--text-muted)' }}>{item.type} • {item.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/career-guidance" className="btn-primary">
                AI Career Assessment <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Free Counseling
              </Link>
            </div>
            
            {/* Stats inline */}
            <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>50+</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Top Partner Colleges</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>10k+</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Students Guided</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>100%</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Admission Support</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{ flex: '1 1 500px', position: 'relative' }}
          >
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg), 0 0 40px var(--primary-glow)',
              aspectRatio: '4/5',
              border: '1px solid var(--glass-border-light)'
            }}>
              <img 
                src="/hero_campus.png" 
                alt="Modern University Campus" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(120, 53, 15, 0.4) 0%, transparent 60%)'
              }} />
            </div>

            {/* Floating Element */}
            <motion.div 
              className="glass-card animate-float"
              style={{
                position: 'absolute',
                bottom: '-2rem',
                left: '-2rem',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                border: '1px solid var(--glass-border-light)'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={24} color="white" />
              </div>
              <div>
                <p style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '0.25rem' }}>VIT, SRM, Saveetha</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>Direct Admission Partners</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Glows */}
      <div className="animate-pulse-glow" style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(150px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
      <div className="animate-pulse-glow" style={{ position: 'absolute', bottom: '0', left: '0', width: '300px', height: '300px', background: 'var(--accent)', filter: 'blur(150px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0, animationDelay: '2s' }} />

    </section>
  );
};

export default Hero;
