import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X, Scale, Star, MapPin, Building2, CreditCard, Info } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Compare = () => {
    const [compareList, setCompareList] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const queryIds = new URLSearchParams(location.search).get('ids') || '';

    useEffect(() => {
        const fetchColleges = async () => {
            if (!queryIds) {
                setLoading(false);
                return;
            }
            try {
                const ids = queryIds.split(',').map(id => parseInt(id));
                const { data, error } = await supabase
                    .from('colleges')
                    .select('*')
                    .in('id', ids);
                
                if (error) throw error;
                setCompareList(data || []);
            } catch (err) {
                console.error('Comparison fetch failed:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchColleges();
    }, [queryIds]);

    const removeCollege = (id) => {
        const newList = compareList.filter(c => c.id !== id);
        setCompareList(newList);
        const newIds = newList.map(c => c.id).join(',');
        window.history.replaceState(null, '', `/compare?ids=${newIds}`);
    };

    if (loading) return (
        <div style={{ paddingTop: '150px', textAlign: 'center', color: 'var(--text-dim)', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <div className="animate-pulse-slow">Analyzing comparison metrics...</div>
        </div>
    );

    const parameters = [
        { key: 'location', label: 'Campus Location', icon: <MapPin size={18} /> },
        { key: 'accreditation', label: 'Accreditation', icon: <Building2 size={18} /> },
        { key: 'rating', label: 'Student Rating', icon: <Star size={18} /> },
        { key: 'fees', label: 'Tuition Fees (Sem)', icon: <Scale size={18} /> },
        { key: 'hostel_fees', label: 'Hostel Fees (Year)', icon: <CreditCard size={18} /> },
        { key: 'rank', label: 'State Rank', icon: <Info size={18} /> }
    ];

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <Link to="/search" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                            <ArrowLeft size={16} /> Back to Search
                        </Link>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Strategic <span style={{ color: 'var(--accent)' }}>Comparison</span></h2>
                    </motion.div>
                    {compareList.length < 4 && (
                        <Link to="/search" className="btn-secondary" style={{ padding: '0.8rem 1.8rem' }}>+ Add Institution</Link>
                    )}
                </div>

                {compareList.length > 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card" 
                        style={{ padding: '0', overflow: 'hidden', background: '#fff' }}
                    >
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '280px', textAlign: 'left', padding: '2.5rem', borderBottom: '1px solid var(--glass-border)', background: 'var(--bg-dark)' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Comparison Matrix</span>
                                        </th>
                                        {compareList.map(college => (
                                            <th key={college.id} style={{ padding: '2.5rem', textAlign: 'center', borderBottom: '1px solid var(--glass-border)', position: 'relative' }}>
                                                <button 
                                                    onClick={() => removeCollege(college.id)}
                                                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(239, 68, 68, 0.05)', border: 'none', color: '#dc2626', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer' }}
                                                >
                                                    <X size={14} />
                                                </button>
                                                <div style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '0.5rem' }}>{college.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{college.location}</div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {parameters.map((param, idx) => (
                                        <tr key={param.key} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)' }}>
                                            <td style={{ padding: '1.8rem 2.5rem', borderBottom: '1px solid var(--glass-border)', background: 'var(--bg-dark)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', fontWeight: '700', color: 'var(--primary)' }}>
                                                    <span style={{ color: 'var(--accent)' }}>{param.icon}</span>
                                                    {param.label}
                                                </div>
                                            </td>
                                            {compareList.map(college => (
                                                <td key={college.id} style={{ padding: '1.8rem', textAlign: 'center', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-main)', fontSize: '1rem', fontWeight: '500' }}>
                                                    {param.key === 'rating' ? (
                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)' }}>
                                                            <Star size={16} fill="currentColor" /> {college.rating || '4.0'}
                                                        </div>
                                                    ) : param.key.includes('fees') ? (
                                                        <span style={{ fontWeight: '700' }}>₹{(college[param.key] || 0).toLocaleString()}</span>
                                                    ) : param.key === 'rank' ? (
                                                        <span style={{ color: 'var(--accent)', fontWeight: '800' }}>#{college.rank || 'N/A'}</span>
                                                    ) : college[param.key] || 'N/A'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    <tr>
                                        <td style={{ padding: '3rem', background: 'var(--bg-dark)' }}></td>
                                        {compareList.map(college => (
                                            <td key={college.id} style={{ padding: '3rem', textAlign: 'center' }}>
                                                <Link to={`/college/${college.id}`} className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '10px' }}>Full Profile</Link>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ textAlign: 'center', padding: '10rem 2rem', background: 'var(--glass-bg)', borderRadius: '30px', border: '1px dashed var(--glass-border)' }}
                    >
                        <Scale size={80} color="var(--text-muted)" style={{ opacity: 0.15, marginBottom: '2.5rem' }} />
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>No comparison targets selected</h3>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '3rem', fontSize: '1.1rem' }}>Select up to 4 institutions from our directory to compare metrics side-by-side.</p>
                        <Link to="/search" className="btn-primary" style={{ padding: '1rem 3rem' }}>Explore Directory</Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Compare;
