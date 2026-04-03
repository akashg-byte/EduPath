import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Maximize2 } from 'lucide-react';

const Gallery = () => {
  const images = [
    { id: 1, title: 'VIT Campus Overview', category: 'Partner Institution', size: 'large' },
    { id: 2, title: 'SRM Tech Park', category: 'Infrastructure', size: 'small' },
    { id: 3, title: 'Medical College Labs', category: 'Facilities', size: 'small' },
    { id: 4, title: 'Saveetha Dental College', category: 'Medical Partners', size: 'small' },
    { id: 5, title: 'Takshashila Main Block', category: 'Partner Institution', size: 'large' },
    { id: 6, title: 'Counseling Session', category: 'Our Services', size: 'small' },
    { id: 7, title: 'Career Guidance Hub', category: 'Our Services', size: 'small' },
    { id: 8, title: 'Student Success Stories', category: 'Placements', size: 'small' },
  ];

  return (
    <div className="gallery-page">
      <section>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">Our <span style={{ color: 'var(--accent)' }}>Network</span></h1>
            <p className="section-subtitle">
              Take a visual tour through our partner institutions, world-class facilities, and past student successes.
            </p>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gridAutoRows: '240px',
            gap: '1.5rem',
            gridAutoFlow: 'dense'
          }}>
            {images.map((img, idx) => (
              <motion.div 
                key={img.id} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card" 
                style={{ 
                  padding: 0, 
                  overflow: 'hidden', 
                  position: 'relative',
                  gridColumn: img.size === 'large' ? 'span 2' : 'span 1',
                  gridRow: img.size === 'large' ? 'span 2' : 'span 1'
                }}
              >
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: 'linear-gradient(45deg, #0f172a, #1e293b)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                   {/* Blur Orb in each card for aesthetic */}
                   <div style={{ 
                     position: 'absolute', 
                     width: '150px', 
                     height: '150px', 
                     background: idx % 2 === 0 ? 'var(--primary)' : 'var(--accent)', 
                     filter: 'blur(60px)', 
                     opacity: 0.15 
                   }}></div>
                   
                   <Camera size={48} style={{ opacity: 0.2, color: 'var(--accent)' }} />
                   
                   {/* Overlay on hover */}
                   <motion.div 
                     initial={{ opacity: 0 }}
                     whileHover={{ opacity: 1 }}
                     style={{ 
                       position: 'absolute', 
                       inset: 0, 
                       background: 'rgba(2, 6, 23, 0.8)', 
                       backdropFilter: 'blur(4px)',
                       display: 'flex', 
                       flexDirection: 'column', 
                       justifyContent: 'flex-end', 
                       padding: '2rem',
                       cursor: 'pointer'
                     }}
                   >
                     <div style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                       {img.category}
                     </div>
                     <h3 style={{ color: 'white', marginBottom: '1rem' }}>{img.title}</h3>
                     <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        border: '1px solid var(--glass-border)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'white'
                     }}>
                        <Maximize2 size={14} />
                     </div>
                   </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <style>{`
        @media (max-width: 640px) {
          .glass-card { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
