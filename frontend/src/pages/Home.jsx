import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { Award, Users, BookOpen, MapPin, CheckCircle2, Calendar, Target, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAnnouncements } from '../services/api';

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error('Failed to fetch announcements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const stats = [
    { icon: <Award size={32} />, value: "50+", label: "Top Universities" },
    { icon: <Users size={32} />, value: "10,000+", label: "Students Placed" },
    { icon: <BookOpen size={32} />, value: "100%", label: "Admission Support" },
    { icon: <Target size={32} />, value: "15+", label: "Years Experience" },
  ];

  return (
    <div className="home-page">
      <Hero />
      
      {/* Stats Section */}
      <section style={{ padding: '0 0 8rem 0', marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="grid">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card" 
                style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}
              >
                <div style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  {stat.icon}
                </div>
                <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white' }}>{stat.value}</h3>
                <p style={{ color: 'var(--text-dim)', fontWeight: '500' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" style={{ background: 'linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.05))' }}>
        <div className="container">
          <div className="grid" style={{ alignItems: 'center', gap: '5rem' }}>
            <motion.div
               initial={{ opacity: 0, x: -40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Your Dedicated <span style={{ color: 'var(--accent)' }}>Career Partners</span></h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-dim)', marginBottom: '2rem', lineHeight: '1.8' }}>
                NaseeeEdu takes the stress out of college admissions. We specialize in finding the perfect institution for your ambitions. From Engineering and Medicine to Arts & Sciences, we have strong tie-ups with Tamil Nadu's top institutions including VIT, SRM, Saveetha, Takshashila, and more. 
              </p>
              <div className="grid" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
                {['Direct Admissions', 'Career Guidance', 'Course Selection', 'Scholarship Support'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontSize: '1rem' }}>
                    <CheckCircle2 size={18} color="var(--accent)" /> {item}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card" 
              style={{ padding: '1rem', borderRadius: '2rem', overflow: 'hidden' }}
            >
              <div style={{ 
                height: '400px', 
                width: '100%', 
                borderRadius: '1.5rem', 
                background: 'linear-gradient(45deg, #1e293b, #0f172a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div className="animate-pulse-slow" style={{ position: 'absolute', width: '200px', height: '200px', background: 'var(--primary)', filter: 'blur(80px)', opacity: 0.2 }}></div>
                <div style={{ textAlign: 'center', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <GraduationCap size={64} style={{ color: 'var(--accent)', marginBottom: '1rem', opacity: 0.8 }} />
                  <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Expert Counseling</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>We guide you every step of the way</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Latest <span style={{ color: 'var(--accent)' }}>Admission Alerts</span></h2>
              <p style={{ color: 'var(--text-dim)' }}>Stay updated with counseling dates, exam deadlines, and college news.</p>
            </div>
            <button className="btn-secondary">View All Alerts</button>
          </div>

          {loading ? (
             <div style={{ textAlign: 'center', py: '4rem' }}>Loading alerts...</div>
          ) : (
            <div className="grid">
              {announcements.map((ann, i) => (
                <motion.div 
                  key={ann.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card announcement-card"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ padding: '0.4rem 0.8rem', background: 'rgba(37, 99, 235, 0.15)', color: 'var(--primary-light)', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {ann.id % 2 === 0 ? 'Exam Update' : 'Admission News'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      <Calendar size={14} /> {ann.date}
                    </div>
                  </div>
                  <h3 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.3rem', lineHeight: '1.4' }}>{ann.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>{ann.content || ann.category}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--glass-border)' }}>
                     <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>Read Full Story →</a>
                     <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                        <div style={{ width: '8px', height: '8px', background: 'var(--glass-border)', borderRadius: '50%' }}></div>
                     </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
