import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ArrowRight, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Top Colleges', path: '/courses' },
    { name: 'Career AI', path: '/career-guidance' },
    { name: 'Compare', path: '/compare' },
    { name: 'Cutoff Predictor', path: '/cutoff-predictor' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 1000, 
      transition: 'var(--transition)',
      padding: scrolled ? '1rem 0' : '1.5rem 0',
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          color: 'white', 
          textDecoration: 'none', 
          fontWeight: '800', 
          fontSize: '1.4rem',
          letterSpacing: '-0.03em'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(135deg, var(--primary), var(--accent))', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 5px 15px var(--primary-glow)'
          }}>
            <GraduationCap size={24} color="white" />
          </div>
          <span style={{ 
            background: 'var(--gradient-text)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            color: 'var(--primary)' 
          }}>
            Naseee<span style={{ color: 'var(--accent)', WebkitTextFillColor: 'initial' }}>Edu</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'none', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              style={{ 
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-dim)', 
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: location.pathname === link.path ? '700' : '500',
                transition: 'var(--transition)',
                position: 'relative'
              }}
              onMouseEnter={e => e.target.style.color = 'var(--primary)'}
              onMouseLeave={e => e.target.style.color = location.pathname === link.path ? 'var(--primary)' : 'var(--text-dim)'}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-underline"
                  style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '2px', background: 'var(--accent)', borderRadius: '2px' }}
                />
              )}
            </Link>
          ))}
           {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(120, 53, 15, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={16} />
                </div>
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </div>
              <button 
                onClick={handleLogout}
                className="btn-secondary" 
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Logout <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            display: 'none', 
            background: 'none', 
            border: 'none', 
            color: 'var(--primary)', 
            cursor: 'pointer' 
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ 
              background: 'var(--bg-dark)', 
              borderBottom: '1px solid var(--glass-border)',
              overflow: 'hidden'
            }}
          >
            <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  style={{ 
                    color: location.pathname === link.path ? 'var(--accent)' : 'var(--primary)', 
                    textDecoration: 'none',
                    fontSize: '1.25rem',
                    fontWeight: '600'
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', fontWeight: '600', fontSize: '1.1rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(120, 53, 15, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={18} />
                    </div>
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="btn-secondary" 
                    style={{ padding: '0.8rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
                  >
                    Logout <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                  <Link to="/login" className="btn-primary" style={{ padding: '1rem', textAlign: 'center', width: '100%' }}>
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
