import React from 'react';
import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Instagram, Linkedin, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#fff', 
      marginTop: '8rem', 
      padding: '6rem 0 3rem 0', 
      borderTop: '1px solid var(--glass-border)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Blur */}
      <div style={{ position: 'absolute', bottom: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '200px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.05, borderRadius: '50%', pointerEvents: 'none' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Landmark size={18} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>HARI E<span style={{ color: 'var(--accent)' }}>DU</span></h3>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.8', maxWidth: '400px', marginBottom: '2rem' }}>
              Your trusted partner in navigating the complex landscape of college admissions. We help you find the perfect institution for your future.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" style={{ color: 'var(--text-dim)', transition: 'var(--transition)' }} 
                   onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} 
                   onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Search Colleges', 'Career Guidance AI', 'Compare Institutions', 'Cutoff Predictor', 'Admin Login'].map(item => (
                <li key={item}>
                   <Link to={item === 'Search Colleges' ? '/search' : item === 'Career Guidance AI' ? '/career-guidance' : item === 'Compare Institutions' ? '/compare' : item === 'Admin Login' ? '/admin/login' : '/cutoff-predictor'} style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.95rem', transition: 'var(--transition)' }}
                     onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} 
                     onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Cookies Policy', path: '/cookies-policy' },
                { name: 'Help Center', path: '/contact' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.95rem', transition: 'var(--transition)' }}
                     onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} 
                     onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ 
          marginTop: '6rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--glass-border)', 
          textAlign: 'center' 
        }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} NaseeeEdu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
