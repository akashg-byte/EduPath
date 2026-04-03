import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Search, School, BookOpen, CheckCircle, AlertCircle, ArrowRight, RefreshCcw, TrendingUp, MapPin } from 'lucide-react';
import { predictColleges as fetchPredictions } from '../services/api';
import { Link } from 'react-router-dom';

const CutoffPredictor = () => {
  const [marks, setMarks] = useState({
    maths: '',
    physics: '',
    chemistry: ''
  });
  const [cutoff, setCutoff] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (marks.maths && marks.physics && marks.chemistry) {
      const m = parseFloat(marks.maths) || 0;
      const p = parseFloat(marks.physics) || 0;
      const c = parseFloat(marks.chemistry) || 0;
      const calculatedCutoff = m + (p / 2) + (c / 2);
      setCutoff(calculatedCutoff.toFixed(2));
    } else {
      setCutoff(null);
    }
  }, [marks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
      setMarks(prev => ({ ...prev, [name]: value }));
    }
  };

  const predictColleges = async () => {
    if (!cutoff) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPredictions(marks);
      
      // Map backend response to component expectations if needed
      // Backend returns { cutoff, predictions: [{ college_id, college_name, branches: [...] }] }
      const results = data.predictions.map(p => ({
        id: p.college_id,
        name: p.college_name,
        location: 'Tamil Nadu', // Default if not in backend response
        matchPerc: p.branches[0].chance === 'High' ? 95 : 75,
        chance: p.branches[0].chance,
        minCutoff: p.branches[0].cutoffs['2025']
      }));

      setPredictions(results);
    } catch (err) {
      setError('Failed to process historical data. Please try again.');
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const resetFields = () => {
    setMarks({ maths: '', physics: '', chemistry: '' });
    setPredictions([]);
    setCutoff(null);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div style={{ display: 'inline-flex', padding: '0.6rem 1.5rem', background: 'var(--primary)', borderRadius: '100px', color: 'white', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.5rem', alignItems: 'center', gap: '0.6rem', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.2)' }}>
            <Calculator size={16} /> 2026 TNEA Predictor
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', marginBottom: '1.5rem', color: 'var(--primary)' }}>
            Find Your <span style={{ color: 'var(--accent)' }}>Competitive Edge</span>
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
            Our algorithm analyzes 5 years of counseling data to give you the most accurate college predictions based on your 12th cutoff.
          </p>
        </motion.div>

        <div className="predictor-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 450px) 1fr', gap: '4rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
            style={{ padding: '3rem', background: '#fff', height: 'fit-content' }}
          >
            <h3 style={{ fontSize: '1.6rem', marginBottom: '2.5rem', fontWeight: '800' }}>Academic Score</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {['maths', 'physics', 'chemistry'].map((subject) => (
                <div key={subject}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                    {subject}
                  </label>
                  <input
                    type="number"
                    name={subject}
                    value={marks[subject]}
                    onChange={handleInputChange}
                    placeholder="0-100"
                    style={{ width: '100%', padding: '1.2rem', background: 'var(--bg-dark)', border: '1px solid var(--glass-border)', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700' }}
                  />
                </div>
              ))}

              <div style={{ marginTop: '1rem', padding: '2.5rem', background: 'var(--primary)', borderRadius: '20px', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '0.5rem' }}>Calculated Cutoff</p>
                <div style={{ fontSize: '4rem', fontWeight: '900' }}>{cutoff || '0.00'}</div>
              </div>

              <button onClick={predictColleges} disabled={!cutoff || loading} className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                {loading ? <RefreshCcw className="animate-spin" /> : <TrendingUp size={22} />}
                {loading ? 'Running AI Model...' : 'Analyze My Options'}
              </button>
              
              <button onClick={resetFields} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.95rem' }}>Reset Assessment</button>
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <School color="var(--accent)" /> Targeted Opportunities
            </h3>

            <AnimatePresence mode="wait">
              {predictions.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {predictions.map((p, idx) => (
                    <motion.div 
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="glass-card"
                      style={{ padding: '2rem', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div>
                        <h4 style={{ fontSize: '1.4rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '0.4rem' }}>{p.name}</h4>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                          <span><MapPin size={14} /> {p.location}</span>
                          <span>Threshold: {p.minCutoff}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.5rem', color: p.chance === 'High' ? '#22c55e' : '#eab308' }}>
                          {p.chance} Probability
                        </div>
                        <Link to={`/college/${p.id}`} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Details <ArrowRight size={14} /></Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : !loading ? (
                <div style={{ textAlign: 'center', padding: '10rem 3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '30px', border: '1px dashed var(--glass-border)' }}>
                  <TrendingUp size={64} color="var(--text-muted)" style={{ opacity: 0.1, marginBottom: '2rem' }} />
                  <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Complete your academic profile to see matched institutions.</p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '10rem' }}>
                  <div className="loader"></div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .loader {
          width: 60px;
          height: 60px;
          border: 5px solid var(--glass-border);
          border-bottom-color: var(--accent);
          border-radius: 50%;
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 950px) {
          .predictor-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default CutoffPredictor;
