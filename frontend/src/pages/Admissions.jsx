import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAdmissions } from '../services/api';
import { ClipboardCheck, Calendar, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

const Admissions = () => {
  const [process, setProcess] = useState([]);
  const [importantDates, setImportantDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissionsData = async () => {
      try {
        const data = await getAdmissions();
        
        // Map backend response { process: [...], importantDates: [...] } to state
        // Backend keys are slightly different (step vs step_number, event vs event_name)
        const mappedProcess = data.process.map(p => ({
          id: p.step,
          step_number: p.step,
          title: p.title,
          description: p.description
        }));

        const mappedDates = data.importantDates.map((d, i) => ({
          id: i,
          event_name: d.event,
          event_date: d.date
        }));

        setProcess(mappedProcess);
        setImportantDates(mappedDates);
      } catch (err) {
        console.error('Failed to fetch admissions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissionsData();
  }, []);

  if (loading) return (
    <div className="container" style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-dim)' }}>
      <div className="animate-pulse-slow">Loading service information...</div>
    </div>
  );

  return (
    <div className="admissions-page" style={{ paddingTop: '100px', background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <section>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '5rem' }}
          >
            <h1 className="section-title">Seamless <span style={{ color: 'var(--accent)' }}>Admission Process</span></h1>
            <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
              We simplify your college journey. From thousands of options to your dream seat – here is how we make it happen.
            </p>
          </motion.div>
          
          <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
            {/* Process Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h2 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ClipboardCheck color="var(--accent)" /> Our 4-Step Methodology
              </h2>
              {process.map((p, idx) => (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card"
                  style={{ 
                    padding: '2.5rem', 
                    background: '#fff', 
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    gap: '2rem',
                    position: 'relative'
                  }}
                >
                  <div style={{ 
                    flexShrink: 0, 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '14px', 
                    background: 'var(--bg-dark)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: '800',
                    fontSize: '1.2rem',
                    color: 'var(--primary)',
                    border: '1px solid var(--glass-border)'
                  }}>
                    0{p.step_number}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--primary)', fontWeight: '700' }}>{p.title}</h4>
                    <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.7' }}>{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Side Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ background: 'var(--primary)', color: 'white', padding: '3rem' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                    <Calendar size={32} />
                </div>
                <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.8rem' }}>Key Counseling Dates</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {importantDates.map(d => (
                    <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>{d.event_name}</span>
                      <span style={{ fontWeight: '700', fontSize: '1rem' }}>{d.event_date}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="glass-card" 
                style={{ padding: '2.5rem', background: '#fff' }}
              >
                <h3 style={{ marginBottom: '1.25rem', color: 'var(--primary)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <ShieldCheck color="var(--success)" /> Guaranteed Support
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Our team of senior consultants ensure you get the right branch in the right college. We handle documentation, verification, and choice filling.
                </p>
                <button className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                  Contact Consultant <UserCheck size={18} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
