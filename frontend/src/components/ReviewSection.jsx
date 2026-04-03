import React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare, ShieldCheck } from 'lucide-react';

const ReviewSection = ({ collegeId }) => {
    // In a real app, we'd fetch based on collegeId
    const mockReviews = [
        { id: 1, user: "Abhishek Singh", date: "2 days ago", rating: 5, tags: ["Infrastructure", "Placement"], comment: "The campus is absolutely stunning and the placement cell works tirelessly to get everyone placed. Highly recommended!" },
        { id: 2, user: "Meera Nair", date: "1 week ago", rating: 4, tags: ["Academics", "Faculty"], comment: "Professors are very approachable and the curriculum is updated with latest industry trends." }
    ];

    const stats = [
        { label: 'Academics', score: 4.5 },
        { label: 'Infrastructure', score: 4.8 },
        { label: 'Placement', score: 4.3 },
        { label: 'Campus Life', score: 4.6 }
    ];

    return (
        <div className="review-section">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '3rem', marginBottom: '4rem' }} className="review-stats-grid">
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', height: 'fit-content', background: '#fff' }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--accent)', lineHeight: '1' }}>4.5</div>
                    <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--warning)', margin: '1rem 0' }}>
                        {[...Array(5)].map((_, i) => <Star key={i} size={20} fill={i < 4 ? "currentColor" : "none"} />)}
                    </div>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Based on 156 Reviews</p>
                    <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', fontSize: '0.9rem' }}>Write a Review</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {stats.map(stat => (
                        <div key={stat.label}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                <span>{stat.label}</span>
                                <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{stat.score}/5</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(stat.score/5)*100}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    style={{ height: '100%', background: 'var(--gradient-primary)' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {mockReviews.map((review, idx) => (
                    <motion.div 
                        key={review.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card" 
                        style={{ padding: '2rem', background: '#fff' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {review.user[0]}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {review.user} <ShieldCheck size={16} color="var(--success)" />
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Student • {review.date}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', color: 'var(--warning)', gap: '2px' }}>
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                        </div>

                        <p style={{ color: 'var(--text-dim)', lineHeight: '1.7', marginBottom: '1.5rem' }}>"{review.comment}"</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            {review.tags.map(tag => (
                                <span key={tag} style={{ fontSize: '0.7rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', border: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <button style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <ThumbsUp size={16} /> Helpful (12)
                            </button>
                            <button style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <MessageSquare size={16} /> Comment
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .review-stats-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ReviewSection;
