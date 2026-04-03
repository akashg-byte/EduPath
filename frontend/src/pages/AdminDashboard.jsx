import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, MessageSquare, School, TrendingUp, Download, RefreshCcw, Search,
    UserCircle, Mail, Phone, Calendar, ChevronRight, LayoutDashboard, Edit, Trash2, Plus, X
} from 'lucide-react';
import { getProfiles, getContacts, getDashboardStats, seedDatabase, getCourses, addCollege, updateCollege, deleteCollege } from '../services/api';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ students: 0, enquiries: 0, colleges: 0 });
    const [profiles, setProfiles] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCollege, setEditingCollege] = useState(null);
    const [formData, setFormData] = useState({
        name: '', location: '', type: 'Private', status: 'Active', 
        cutoff: '', fees: '', programs: '', description: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsData, profilesData, contactsData, collegesData] = await Promise.all([
                getDashboardStats(),
                getProfiles(),
                getContacts(),
                getCourses()
            ]);
            setStats(statsData);
            setProfiles(profilesData || []);
            setContacts(contactsData || []);
            setColleges(collegesData || []);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        localStorage.removeItem('admin_bypass');
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const handleDeleteCollege = async (id) => {
        if (window.confirm("Are you sure you want to delete this institute? This cannot be undone.")) {
            try {
                await deleteCollege(id);
                fetchData();
            } catch (err) {
                console.error(err);
                alert("Failed to delete college.");
            }
        }
    };

    const openModal = (college = null) => {
        if (college) {
            setEditingCollege(college);
            setFormData({
                name: college.name || '',
                location: college.location || '',
                type: college.type || 'Private',
                status: college.status || 'Active',
                cutoff: college.cutoff || '',
                fees: college.fees || '',
                programs: college.programs || '',
                description: college.description || ''
            });
        } else {
            setEditingCollege(null);
            setFormData({
                name: '', location: '', type: 'Private', status: 'Active', 
                cutoff: '', fees: '', programs: '', description: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSaveCollege = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                cutoff: parseFloat(formData.cutoff) || 0,
                fees: parseInt(formData.fees) || 0
            };
            if (editingCollege) {
                await updateCollege(editingCollege.id, payload);
            } else {
                await addCollege(payload);
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            console.error(err);
            alert("Failed to save college details.");
        }
    };

    const filteredProfiles = profiles.filter(p => 
        p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.mobile?.includes(searchTerm)
    );

    const filteredContacts = contacts.filter(c => 
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredColleges = colleges.filter(c => 
        c.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{ color: '#3b82f6' }}
                >
                    <RefreshCcw size={48} />
                </motion.div>
            </div>
        );
    }

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card"
            style={{ 
                padding: '2rem', background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', flex: 1, minWidth: '280px'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '16px', background: `${color}15`, color: color }}><Icon size={24} /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.9rem', fontWeight: '600' }}>
                    <TrendingUp size={16} /> {trend}
                </div>
            </div>
            <h3 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginTop: '0.5rem' }}>{value}</div>
        </motion.div>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(45deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Dashboard Overview
                    </h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.4)', marginTop: '0.5rem' }}>System status and activity reporting</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button onClick={fetchData} style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <RefreshCcw size={18} /> Refresh
                    </button>
                    <button onClick={handleLogout} style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', background: '#ef4444', border: 'none', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                        Sign Out
                    </button>
                </div>
            </header>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
                <StatCard title="Total Students" value={stats.students} icon={Users} color="#3b82f6" trend="+12%" />
                <StatCard title="Active Enquiries" value={stats.enquiries} icon={MessageSquare} color="#8b5cf6" trend="+5%" />
                <StatCard title="Total Colleges" value={stats.colleges} icon={School} color="#f59e0b" trend="+2%" />
            </div>

            <div className="glass-card" style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {['overview', 'students', 'enquiries', 'colleges'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{ 
                                    padding: '0.75rem 1.5rem', borderRadius: '12px', 
                                    background: activeTab === tab ? '#3b82f6' : 'transparent',
                                    border: activeTab === tab ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'white', fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.3s ease'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {activeTab === 'colleges' && (
                            <button onClick={() => openModal()} style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', background: '#10b981', border: 'none', color: 'white', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Plus size={18} /> Add College
                            </button>
                        )}
                        <div style={{ position: 'relative', width: '300px' }}>
                            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.3)' }} size={18} />
                            <input 
                                type="text" placeholder="Search records..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', outline: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    {activeTab === 'students' ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.3)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                    <th style={{ padding: '1rem' }}>Student Name</th><th style={{ padding: '1rem' }}>Contact Info</th>
                                    <th style={{ padding: '1rem' }}>Join Date</th><th style={{ padding: '1rem' }}>Role</th><th style={{ padding: '1rem' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProfiles.map(profile => (
                                    <tr key={profile.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'all 0.2s ease' }} className="hover-row">
                                        <td style={{ padding: '1.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserCircle size={24} /></div>
                                                <span style={{ fontWeight: '600' }}>{profile.full_name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={12} /> {profile.email}</div>
                                                {profile.mobile && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={12} /> {profile.mobile}</div>}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem', color: 'rgba(255, 255, 255, 0.6)' }}>{new Date(profile.created_at).toLocaleDateString()}</td>
                                        <td style={{ padding: '1.25rem' }}><span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>{profile.role}</span></td>
                                        <td style={{ padding: '1.25rem' }}><button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.3)', cursor: 'pointer' }}><ChevronRight size={20} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : activeTab === 'enquiries' ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.3)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                    <th style={{ padding: '1rem' }}>Sender</th><th style={{ padding: '1rem' }}>Enquiry Details</th>
                                    <th style={{ padding: '1rem' }}>Date</th><th style={{ padding: '1rem' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.map(contact => (
                                    <tr key={contact.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <td style={{ padding: '1.25rem' }}>
                                            <div style={{ fontWeight: '600', marginBottom: '8px' }}>{contact.name}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={12} /> {contact.email}</div>
                                                {contact.mobile && <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={12} /> {contact.mobile}</div>}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem' }}>
                                            {contact.subject && <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'white', marginBottom: '0.25rem' }}>{contact.subject}</div>}
                                            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '400px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {contact.message || contact.query}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem', color: 'rgba(255, 255, 255, 0.6)' }}>{new Date(contact.created_at).toLocaleDateString()}</td>
                                        <td style={{ padding: '1.25rem' }}><span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.8rem', fontWeight: '700' }}>New</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : activeTab === 'colleges' ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.3)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                    <th style={{ padding: '1rem' }}>Institute Name</th><th style={{ padding: '1rem' }}>Location</th>
                                    <th style={{ padding: '1rem' }}>Cutoff</th><th style={{ padding: '1rem' }}>Fees</th>
                                    <th style={{ padding: '1rem' }}>Status</th><th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredColleges.map(c => (
                                    <tr key={c.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <td style={{ padding: '1.25rem' }}>
                                            <div style={{ fontWeight: '600' }}>{c.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#db2777', textTransform: 'uppercase', fontWeight: '800' }}>{c.type}</div>
                                        </td>
                                        <td style={{ padding: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>{c.location}</td>
                                        <td style={{ padding: '1.25rem', color: 'var(--accent)', fontWeight: 'bold' }}>{c.cutoff}</td>
                                        <td style={{ padding: '1.25rem', fontWeight: 'bold' }}>₹{c.fees?.toLocaleString()}</td>
                                        <td style={{ padding: '1.25rem' }}>
                                            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: c.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: c.status === 'Active' ? '#22c55e' : '#ef4444', fontSize: '0.8rem', fontWeight: '700' }}>{c.status}</span>
                                        </td>
                                        <td style={{ padding: '1.25rem' }}>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button onClick={() => openModal(c)} style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#3b82f6', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}><Edit size={16} /></button>
                                                <button onClick={() => handleDeleteCollege(c.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ marginBottom: '3rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>System Health</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                                    <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>API Uptime</div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981' }}>99.9%</div>
                                    </div>
                                    <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Requests Handled</div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#3b82f6' }}>12,450</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit / Create College Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                            style={{ background: '#1e293b', width: '100%', maxWidth: '600px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{editingCollege ? 'Edit College Details' : 'Add New College'}</h2>
                                <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            
                            <form onSubmit={handleSaveCollege} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Institute Name</label>
                                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Location / City</label>
                                        <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Institue Type</label>
                                        <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}>
                                            <option>Private</option><option>Government</option><option>Autonomous</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Status</label>
                                        <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}>
                                            <option>Active</option><option>Inactive</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Min Cutoff</label>
                                        <input required type="number" step="0.1" value={formData.cutoff} onChange={e => setFormData({...formData, cutoff: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Fees (₹)</label>
                                        <input required type="number" value={formData.fees} onChange={e => setFormData({...formData, fees: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Offered Programs (Comma separated)</label>
                                    <input type="text" placeholder="e.g. B.Tech CSE, B.Tech ECE" value={formData.programs} onChange={e => setFormData({...formData, programs: e.target.value})} style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Description</label>
                                    <textarea rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none', resize: 'none' }} />
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                                    <button type="submit" style={{ flex: 2, padding: '1rem', borderRadius: '12px', background: '#3b82f6', border: 'none', color: 'white', fontWeight: '600', cursor: 'pointer' }}>{editingCollege ? 'Save Changes' : 'Create Institute'}</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
