import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, GraduationCap, Star, ChevronDown, LayoutGrid, List, X, School, Globe } from 'lucide-react';
import { getCourses } from '../services/api';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const SearchResults = () => {
    const [colleges, setColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedForCompare, setSelectedForCompare] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [filters, setFilters] = useState({
        location: 'All',
        program: 'All',
        status: 'All'
    });

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const data = await getCourses();
                setColleges(data);
                applySearch(data, query);
            } catch (err) {
                console.error('Failed to fetch colleges:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchColleges();
    }, [query]);

    useEffect(() => {
        applyFilters();
    }, [filters, colleges]);

    const applySearch = (data, q) => {
        if (!q) {
            setFilteredColleges(data);
            return;
        }
        const filtered = data.filter(college => 
            college.name.toLowerCase().includes(q.toLowerCase()) ||
            college.programs.toLowerCase().includes(q.toLowerCase()) ||
            college.location.toLowerCase().includes(q.toLowerCase())
        );
        setFilteredColleges(filtered);
    };

    const applyFilters = () => {
        let result = [...colleges];
        
        if (query) {
            result = result.filter(c => 
                c.name.toLowerCase().includes(query.toLowerCase()) ||
                c.programs.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (filters.location !== 'All') {
            result = result.filter(c => c.location.includes(filters.location));
        }
        
        if (filters.status !== 'All') {
            result = result.filter(c => c.status === filters.status);
        }

        setFilteredColleges(result);
    };

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

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <div className="container">
                {/* Search Header */}
                <div style={{ marginBottom: '3rem' }}>
                    <p style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Search Results</p>
                    <h2 style={{ fontSize: '2.5rem' }}>
                        {query ? `Showing results for "${query}"` : 'All Colleges & Institutions'}
                    </h2>
                    <p style={{ color: 'var(--text-dim)' }}>{filteredColleges.length} matches found</p>
                </div>

                <div className="search-layout">
                    {/* Filters Sidebar */}
                    <aside className="glass-card" style={{ height: 'fit-content', padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                            <Filter size={18} color="var(--accent)" />
                            <h3 style={{ fontSize: '1.1rem' }}>Filters</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Location</label>
                                <select 
                                    className="filter-select"
                                    value={filters.location}
                                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                                >
                                    <option value="All">All Locations</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Kanchipuram">Kanchipuram</option>
                                    <option value="Villupuram">Villupuram</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Admission Status</label>
                                <select 
                                    className="filter-select"
                                    value={filters.status}
                                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                                >
                                    <option value="All">All Status</option>
                                    <option value="Admissions Open">Admissions Open</option>
                                    <option value="Limited Seats">Limited Seats</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            style={{ width: '100%', marginTop: '2rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white', cursor: 'pointer' }}
                            onClick={() => setFilters({ location: 'All', program: 'All', status: 'All' })}
                        >
                            Reset Filters
                        </button>
                    </aside>

                    {/* Results Grid */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem', gap: '1rem' }}>
                            <button className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><LayoutGrid size={18} /></button>
                            <button className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={18} /></button>
                        </div>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '5rem' }}>Loading colleges...</div>
                        ) : filteredColleges.length > 0 ? (
                            <div className={viewMode === 'grid' ? 'grid' : 'list-view'}>
                                <AnimatePresence>
                                    {filteredColleges.map((college) => (
                                        <motion.div 
                                            key={college.id} 
                                            variants={itemVariants}
                                            className="glass-card college-card" 
                                            style={{ 
                                                padding: '2rem', 
                                                border: '1px solid var(--glass-border)',
                                                background: '#fff',
                                                transition: 'var(--transition)'
                                            }}
                                        >
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }} className="college-card-inner">
                                                <div style={{ width: '120px', height: '120px', borderRadius: '1rem', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <School size={48} color="var(--primary)" style={{ opacity: 0.5 }} />
                                                </div>
                                                
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                        <div>
                                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>{college.name}</h3>
                                                            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={14} /> {college.location}</span>
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Globe size={14} /> {college.type}</span>
                                                            </div>
                                                        </div>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedForCompare.some(c => c.id === college.id)}
                                                            onChange={() => toggleCompare(college)}
                                                            style={{ width: '20px', height: '20px', accentColor: 'var(--accent)', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                    
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '0.75rem' }}>
                                                        <div>
                                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Courses Offered</div>
                                                            <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{college.programs}</div>
                                                        </div>
                                                        <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
                                                        <div>
                                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Admission Status</div>
                                                            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--success)' }}>{college.status}</div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                            <span style={{ padding: '0.4rem 1rem', background: 'rgba(217, 119, 6, 0.05)', border: '1px solid rgba(217, 119, 6, 0.1)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: '600' }}>NAAC A++</span>
                                                            <span style={{ padding: '0.4rem 1rem', background: 'rgba(120, 53, 15, 0.05)', border: '1px solid rgba(120, 53, 15, 0.1)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>NBA Accredited</span>
                                                        </div>
                                                        <Link to={`/college/${college.id}`} className="btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>View Full Details</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed var(--glass-border)' }}>
                                <Search size={48} color="var(--text-muted)" style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
                                <h3>No colleges found</h3>
                                <p style={{ color: 'var(--text-dim)' }}>Try adjusting your search or filters to find what you're looking for.</p>
                            </div>
                        )}
                    </div>
                </div>

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
                                background: '#0d1930', 
                                border: '1px solid var(--accent)', 
                                padding: '1rem 2rem', 
                                borderRadius: '1.5rem', 
                                display: 'flex', 
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center', 
                                gap: '1rem', 
                                width: 'min(90vw, 600px)',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
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

            <style>{`
                .search-layout {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 3rem;
                }

                @media (max-width: 900px) {
                    .search-layout {
                        grid-template-columns: 1fr;
                    }
                }

                .filter-select {
                    width: 100%;
                    padding: 0.75rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 0.5rem;
                    color: white;
                    outline: none;
                    cursor: pointer;
                }

                .filter-select option {
                    background: #0d1930;
                }

                .view-toggle {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--glass-border);
                    color: var(--text-muted);
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .view-toggle.active {
                    background: var(--primary);
                    color: white;
                    border-color: var(--primary);
                }

                .list-view {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .result-card {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .rating-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    background: rgba(245, 158, 11, 0.1);
                    color: var(--warning);
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.5rem;
                    font-size: 0.8rem;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

export default SearchResults;
