import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  BrainCircuit, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  DollarSign,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { analyzeCareer } from '../services/api';

const CareerGuidance = () => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [formData, setFormData] = useState({
        interests: [],
        strengths: [],
        marks: '',
        budget: '',
        location: 'All'
    });

    const interestOptions = [
        { label: 'Coding & Tech', value: 'coding' },
        { label: 'Biology & Life Sciences', value: 'biology' },
        { label: 'Business & Finance', value: 'business' },
        { label: 'Creative Arts & Design', value: 'design' },
        { label: 'Law & Governance', value: 'law' },
        { label: 'Social Service', value: 'social' }
    ];

    const strengthOptions = [
        { label: 'Mathematics & Logic', value: 'math' },
        { label: 'Memory & Recall', value: 'memory' },
        { label: 'Public Speaking', value: 'communication' },
        { label: 'Creative Thinking', value: 'creativity' },
        { label: 'Problem Solving', value: 'problem-solving' }
    ];

    const handleOptionToggle = (field, value) => {
        const current = formData[field];
        if (current.includes(value)) {
            setFormData({ ...formData, [field]: current.filter(v => v !== value) });
        } else {
            setFormData({ ...formData, [field]: [...current, value] });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const data = await analyzeCareer(formData);
            setResults(data);
            setStep(4); // Move to results
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const renderStep = () => {
        switch(step) {
            case 0:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>What <span className="text-gradient">Interests</span> You?</h2>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>Select the areas that excite you the most. You can choose multiple.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {interestOptions.map(opt => (
                                <div 
                                    key={opt.value}
                                    onClick={() => handleOptionToggle('interests', opt.value)}
                                    className={`glass-card ${formData.interests.includes(opt.value) ? 'selected' : ''}`}
                                    style={{ 
                                        padding: '1.5rem', 
                                        cursor: 'pointer',
                                        borderColor: formData.interests.includes(opt.value) ? 'var(--accent)' : 'var(--glass-border)',
                                        textAlign: 'center'
                                    }}
                                >
                                    {opt.label}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            case 1:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Where do you <span className="text-gradient">Excel</span>?</h2>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>Choose your top skills and natural strengths.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {strengthOptions.map(opt => (
                                <div 
                                    key={opt.value}
                                    onClick={() => handleOptionToggle('strengths', opt.value)}
                                    className={`glass-card ${formData.strengths.includes(opt.value) ? 'selected' : ''}`}
                                    style={{ 
                                        padding: '1.5rem', 
                                        cursor: 'pointer',
                                        borderColor: formData.strengths.includes(opt.value) ? 'var(--accent)' : 'var(--glass-border)',
                                        textAlign: 'center'
                                    }}
                                >
                                    {opt.label}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Academic & <span className="text-gradient">Budget</span></h2>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>Tell us about your performance and preferences.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Average 12th Marks (%)</label>
                                <input 
                                    type="number" 
                                    className="filter-select" 
                                    style={{ width: '100%' }}
                                    value={formData.marks}
                                    onChange={(e) => setFormData({...formData, marks: e.target.value})}
                                    placeholder="e.g. 85"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Annual Budget Limit (Optional)</label>
                                <input 
                                    type="number" 
                                    className="filter-select" 
                                    style={{ width: '100%' }}
                                    value={formData.budget}
                                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                    placeholder="e.g. 150000"
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Preferred <span className="text-gradient">Location</span></h2>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>Where would you like to study?</p>
                        <select 
                            className="filter-select"
                            style={{ width: '100%' }}
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        >
                            <option value="All">Any Location</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Vellore">Vellore</option>
                            <option value="Coimbatore">Coimbatore</option>
                        </select>
                        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '1rem', border: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <AlertCircle color="var(--primary)" />
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>We are analyzing your inputs across 500+ career paths and 50+ colleges.</p>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <div className="results-container">
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <div style={{ width: '80px', height: '80px', background: 'var(--gradient-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Target size={40} color="white" />
                            </div>
                            <h2 style={{ fontSize: '2.5rem' }}>Your Personalized <span className="text-gradient">Career Roadmap</span></h2>
                            <p style={{ color: 'var(--text-dim)' }}>Based on your interests in {formData.interests.join(', ')} and strengths in {formData.strengths.join(', ')}.</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                            {results && results.map((result, idx) => (
                                <motion.div 
                                    key={result.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="glass-card"
                                    style={{ padding: '3rem', background: '#fff' }}
                                >
                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 350px', gap: '4rem' }} className="result-grid">
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                                <h3 style={{ fontSize: '2rem', color: 'var(--accent)' }}>{idx + 1}. {result.title}</h3>
                                                <div style={{ padding: '0.4rem 1rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 'bold' }}>Match: {result.score}%</div>
                                            </div>
                                            <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                                                {result.description} This path aligns with your natural aptitude for {formData.strengths[0]} and your passion for {formData.interests[0]}.
                                            </p>

                                            <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Compass size={20} color="var(--primary)" /> Success Roadmap</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                {result.roadmap.map((step, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-dim)' }}>
                                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>{i + 1}</div>
                                                        {step}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="glass-card" style={{ background: 'var(--bg-dark)', border: '1px solid var(--glass-border)', padding: '2rem' }}>
                                                <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)' }}><School size={18} /> Recommended Colleges</h4>
                                                {result.colleges.length > 0 ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                                        {result.colleges.map(college => (
                                                            <div key={college.id} style={{ borderBottom: '1px solid var(--glass-border)', pb: '1rem' }}>
                                                                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{college.name}</div>
                                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                                    <span><MapPin size={10} /> {college.location}</span>
                                                                    <span style={{ color: 'var(--success)' }}>₹{college.fees.toLocaleString()}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <Link to="/search" style={{ fontSize: '0.85rem', color: 'var(--accent)', textDecoration: 'none', textAlign: 'center', marginTop: '1rem' }}>View More Options <ChevronRight size={14} /></Link>
                                                    </div>
                                                ) : (
                                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No exact matches for your budget/location. Explore all colleges for more options.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                            <button className="btn-secondary" onClick={() => { setStep(0); setResults(null); }}>Start New Assessment</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <div className="container">
                {step < 4 && (
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--accent)' }}>Assessment Tool</span>
                            <span>Step {step + 1} of 4</span>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ height: '4px', background: 'var(--glass-border)', borderRadius: '2px', marginBottom: '4rem', overflow: 'hidden' }}>
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${((step + 1) / 4) * 100}%` }}
                                style={{ height: '100%', background: 'var(--gradient-primary)' }}
                            />
                        </div>

                        {renderStep()}

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5rem' }}>
                            <button 
                                className="btn-secondary" 
                                onClick={prevStep} 
                                disabled={step === 0}
                                style={{ opacity: step === 0 ? 0 : 1 }}
                            >
                                <ChevronLeft size={20} /> Previous
                            </button>
                            {step < 3 ? (
                                <button className="btn-primary" onClick={nextStep} style={{ padding: '1rem 3rem' }}>
                                    Next <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ padding: '1rem 3rem' }}>
                                    {loading ? 'Analyzing...' : 'Generate Roadmap'} <BrainCircuit size={20} style={{ marginLeft: '1rem' }} />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {step === 4 && renderStep()}
            </div>
            
            <style>{`
                .selected {
                    background: rgba(37, 99, 235, 0.1) !important;
                    border: 1px solid var(--accent) !important;
                    box-shadow: 0 0 20px rgba(37, 99, 235, 0.2) !important;
                }
                @media (max-width: 900px) {
                    .result-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CareerGuidance;
