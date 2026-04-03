import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCourses } from '../services/api';
import { Search, MapPin, School, BookOpen, X, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
   const [colleges, setColleges] = useState([]);
   const [loading, setLoading] = useState(true);
   const [selectedForCompare, setSelectedForCompare] = useState([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const data = await getCourses();
        setColleges(data);
      } catch (err) {
        console.error('Failed to fetch colleges:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const toggleCompare = (college) => {
    if (selectedForCompare.find(c => c.id === college.id)) {
        setSelectedForCompare(selectedForCompare.filter(c => c.id !== college.id));
    } else if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, college]);
    }
  };

  const handleCompareNavigate = () => {
    const ids = selectedForCompare.map(c => c.id).join(',');
    window.location.href = `/compare?ids=${ids}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="courses-page">
      <section>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">Our Partner Colleges</h1>
            <p className="section-subtitle">
              Discover and get guaranteed admissions in top-tier educational institutions across Tamil Nadu.
            </p>
          </motion.div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
              <div className="animate-pulse-slow">Loading top colleges...</div>
            </div>
          ) : (
            <motion.div 
              className="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {colleges.map((college) => (
                 <motion.div 
                   key={college.id} 
                   className={`glass-card ${selectedForCompare.find(c => c.id === college.id) ? 'selected' : ''}`}
                   variants={itemVariants}
                   style={{ 
                     background: '#fff',
                     border: selectedForCompare.find(c => c.id === college.id) ? '1px solid var(--accent)' : '1px solid var(--glass-border)' 
                   }}
                 >
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                     <div style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       <input 
                         type="checkbox" 
                         checked={selectedForCompare.some(c => c.id === college.id)}
                         onChange={() => toggleCompare(college)}
                         style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: 'var(--accent)' }}
                       />
                       <MapPin size={14} /> {college.location}
                     </div>
                     <div style={{ background: 'var(--bg-dark)', padding: '0.2rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        ID: #{college.id}
                     </div>
                   </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{college.name}</h3>
                  <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '1rem', flexGrow: 1 }}>
                    {college.description}
                  </p>
                  <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-dim)' }}>Programs:</span>
                      <span style={{ textAlign: 'right', marginLeft: '1rem' }}>{college.programs}</span>
                    </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                       <span style={{ color: 'var(--text-dim)' }}>Status:</span>
                       <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{college.status}</span>
                     </div>
                   </div>
                   <div style={{ marginTop: '1.5rem' }}>
                     <Link to={`/college/${college.id}`} className="btn-secondary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}>View Details</Link>
                   </div>
                 </motion.div>
              ))}
            </motion.div>
           )}
         </div>
       </section>

       {/* Floating Compare Bar */}
       <AnimatePresence>
            {selectedForCompare.length > 0 && (
                <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    style={{ 
                        position: 'fixed', 
                        bottom: '2rem', 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        background: '#fff', 
                        border: '1px solid var(--accent)', 
                        padding: '1rem 2rem', 
                        borderRadius: '100px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '2rem', 
                        boxShadow: 'var(--shadow-lg)',
                        zIndex: 1000
                    }}
                >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {selectedForCompare.map(c => (
                            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.8rem' }}>
                                {c.name}
                                <X size={14} style={{ cursor: 'pointer' }} onClick={() => toggleCompare(c)} />
                            </div>
                        ))}
                        {selectedForCompare.length < 3 && <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Add {3 - selectedForCompare.length} more to compare</div>}
                    </div>
                    <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }}></div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setSelectedForCompare([])} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}>Clear All</button>
                        <button 
                            onClick={handleCompareNavigate}
                            className="btn-primary" 
                            style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
                            disabled={selectedForCompare.length < 2}
                        >
                            Compare Now ({selectedForCompare.length})
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
     </div>
  );
};

export default Courses;
