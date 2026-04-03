import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  GraduationCap, 
  Award, 
  Users, 
  ChevronRight, 
  Star, 
  Briefcase, 
  BookOpen, 
  Download,
  CheckCircle2,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { getCourses } from '../services/api';
import ReviewSection from '../components/ReviewSection';

const CollegeDetail = () => {
    const { id } = useParams();
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchCollege = async () => {
            try {
                const data = await getCourses();
                const found = data.find(c => c.id === parseInt(id));
                setCollege(found);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCollege();
    }, [id]);

    if (loading) return <div style={{ paddingTop: '150px', textAlign: 'center', color: 'white' }}>Loading college details...</div>;
    if (!college) return <div style={{ paddingTop: '150px', textAlign: 'center', color: 'white' }}>College not found</div>;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <BookOpen size={16} /> },
        { id: 'courses', label: 'Courses & Fees', icon: <GraduationCap size={16} /> },
        { id: 'placements', label: 'Placements', icon: <Briefcase size={16} /> },
        { id: 'reviews', label: 'Reviews', icon: <Star size={16} /> }
    ];

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            {/* Hero Header */}
            <div style={{ 
                background: 'linear-gradient(to bottom, rgba(37, 99, 235, 0.1), transparent)',
                padding: '4rem 0 2rem',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                <div className="container">
                    <Link to="/search" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} /> Back to Search
                    </Link>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ 
                                    padding: '0.5rem 1rem', 
                                    background: 'rgba(34, 197, 94, 0.15)', 
                                    color: '#4ade80', 
                                    borderRadius: '100px', 
                                    fontSize: '0.75rem', 
                                    fontWeight: 'bold',
                                    border: '1px solid rgba(74, 222, 128, 0.3)'
                                }}>
                                    {college.status}
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={16} /> {college.location}
                                </div>
                            </div>
                            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{college.name}</h1>
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', color: 'var(--warning)' }}>
                                        {[1, 2, 3, 4].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                        <Star size={16} />
                                    </div>
                                    <span style={{ fontWeight: 'bold' }}>4.2</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>(120 Reviews)</span>
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <Award size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="var(--accent)" />
                                    Ranked #15 in Tamil Nadu
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn-secondary" style={{ gap: '0.5rem' }}><Download size={18} /> Brochure</button>
                            <button className="btn-primary">Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ background: '#fff', position: 'sticky', top: '70px', zIndex: 40, borderBottom: '1px solid var(--glass-border)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}> {/* Added container and styling for centering */}
                    <div className="glass-card" style={{ padding: '0.5rem', display: 'inline-flex', gap: '0.5rem', background: '#fff', border: '1px solid var(--glass-border)', borderRadius: '100px' }}>
                        {['Overview', 'Courses', 'Placements', 'Reviews'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.75rem 2rem',
                                    borderRadius: '100px',
                                    border: 'none',
                                    background: activeTab === tab ? 'var(--primary)' : 'transparent',
                                    color: activeTab === tab ? 'white' : 'var(--text-dim)',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'var(--transition)'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ padding: '4rem 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
                    <main>
                        {activeTab === 'Overview' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <section style={{ padding: '0 0 3rem 0' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>About {college.name}</h3>
                                    <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                        {college.description}
                                        <br/><br/>
                                        It is widely recognized for its contribution to higher education in Tamil Nadu, providing students with world-class facilities, expert faculty, and a vibrant campus atmosphere. The institution focuses on holistic development, combining rigorous academics with extracurricular excellence.
                                    </p>
                                </section>

                                <div className="grid" style={{ gap: '2rem', marginBottom: '3rem' }}>
                                    <div className="glass-card" style={{ padding: '2rem' }}>
                                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Users size={20} color="var(--accent)" /> Student Base</h4>
                                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>5000+</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enrolled students across various departments</p>
                                    </div>
                                    <div className="glass-card" style={{ padding: '2rem' }}>
                                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><GraduationCap size={20} color="var(--accent)" /> Faculty</h4>
                                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>350+</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Highly qualified professors and researchers</p>
                                    </div>
                                </div>

                                <section>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Key Highlights</h3>
                                    <div className="grid" style={{ gap: '1rem' }}>
                                        {[
                                            'AC classrooms & Labs',
                                            'Industry Integrated Curriculum',
                                            'Strong Alumni Network',
                                            '100% Placement Support',
                                            'Sports & Cultural Clubs',
                                            'Hostel & Transport Facilities'
                                        ].map((item, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-dim)' }}>
                                                <CheckCircle2 size={18} color="var(--success)" /> {item}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {activeTab === 'courses' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Available Courses</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {college.programs.split(', ').map((prog, idx) => (
                                        <div key={idx} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{prog}</h4>
                                                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                    <span>Duration: 4 Years</span>
                                                    <span>Seats: 120</span>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent)' }}>₹1,50,000</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Per Semester</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'placements' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Placement Statistics 2024-25</h3>
                                <div className="grid" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>95%</div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Students Placed</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>12 LPA</div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Highest Package</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>4.5 LPA</div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Average Package</div>
                                    </div>
                                </div>
                                <h4 style={{ marginBottom: '1.5rem' }}>Top Recruiters</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', opacity: 0.6 }}>
                                    {['Google', 'Microsoft', 'TCS', 'Infosys', 'Wipro', 'Accenture'].map(c => (
                                        <div key={c} style={{ padding: '1rem 2rem', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', fontWeight: 'bold' }}>{c}</div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        
                        {activeTab === 'reviews' && (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <ReviewSection collegeId={college.id} />
                             </motion.div>
                        )}
                    </main>

                    <aside>
                         <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '150px' }}>
                             <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Clock size={18} color="var(--accent)" /> Admission Timeline</h4>
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1.5rem', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%' }}></div>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Application Starts</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>March 15, 2026</div>
                                </div>
                                <div style={{ borderLeft: '2px solid var(--glass-border)', paddingLeft: '1.5rem', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', background: 'var(--glass-border)', borderRadius: '50%' }}></div>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'white' }}>Last Date to Apply</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>May 30, 2026</div>
                                </div>
                                <div style={{ borderLeft: '2px solid var(--glass-border)', paddingLeft: '1.5rem', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', background: 'var(--glass-border)', borderRadius: '50%' }}></div>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'white' }}>Counseling Begins</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>June 15, 2026</div>
                                </div>
                             </div>

                             <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '1rem', border: '1px solid var(--primary-glow)' }}>
                                <h5 style={{ marginBottom: '0.5rem' }}>Need Help?</h5>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>Get direct admission support from our experts.</p>
                                <button className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}>Chat Now</button>
                             </div>
                         </div>
                    </aside>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .container {
                        grid-template-columns: 1fr !important;
                    }
                    aside {
                        margin-top: 3rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default CollegeDetail;
