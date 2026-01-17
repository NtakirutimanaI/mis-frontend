import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEnvelope, FaProjectDiagram, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { profileService } from '../../services/profileService';
import type { ContactMessage } from '../../services/profileService';
import Loading from '../../components/Loading';

const AdminDashboard = () => {
    const [statsData, setStatsData] = useState({
        views: 0,
        messages: 0,
        projects: 0,
        clients: 0
    });
    const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPublic, setIsPublic] = useState(true);
    const [toggling, setToggling] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [stats, msgs, profile] = await Promise.all([
                    profileService.getStats(),
                    profileService.getContactMessages(),
                    profileService.getMyProfile()
                ]);
                setStatsData(stats);
                setRecentMessages(msgs.slice(0, 5));
                setIsPublic(profile.isPublic !== false);
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleVisibility = async () => {
        setToggling(true);
        try {
            const updated = await profileService.updateProfile({ isPublic: !isPublic });
            setIsPublic(updated.isPublic);
        } catch (error) {
            console.error('Failed to update visibility', error);
            alert('Failed to update visibility');
        } finally {
            setToggling(false);
        }
    };

    if (loading) return <Loading />;

    const stats = [
        { label: 'Total Views', value: statsData.views.toLocaleString(), icon: <FaEye />, color: '#e0f2fe', iconColor: '#0ea5e9' },
        { label: 'Messages', value: statsData.messages.toString(), icon: <FaEnvelope />, color: '#f3e8ff', iconColor: '#a855f7' },
        { label: 'Projects', value: statsData.projects.toString(), icon: <FaProjectDiagram />, color: '#dcfce7', iconColor: '#22c55e' },
        { label: 'Clients', value: statsData.clients.toString(), icon: <FaUserTie />, color: '#ffedd5', iconColor: '#f97316' },
    ];

    return (
        <div>
            {/* Stats Grid */}
            <div className="dashboard-grid">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="stat-card"
                    >
                        <div className="stat-icon" style={{ background: stat.color, color: stat.iconColor }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="content-grid">
                <div className="content-card">
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaEnvelope style={{ color: 'var(--primary-teal)' }} /> Recent Messages
                    </h2>
                    {recentMessages.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                            No new messages.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1rem' }}>
                            {recentMessages.map((msg, idx) => (
                                <div key={idx} style={{ padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ fontWeight: 600 }}>{msg.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(msg.createdAt || Date.now()).toLocaleDateString()}</div>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.subject}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Link to="/admin/messages" style={{ color: 'var(--text-main)', textDecoration: 'underline', fontWeight: 600 }}>View All Messages</Link>
                    </div>
                </div>

                <div className="content-card">
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaUserTie style={{ color: 'var(--primary-yellow)' }} /> Profile Status
                    </h2>
                    <div style={{ padding: '1rem', background: 'var(--bg-body)', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Visibility</div>
                            <button
                                onClick={toggleVisibility}
                                disabled={toggling}
                                style={{
                                    fontSize: '0.8rem',
                                    textDecoration: 'underline',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--primary-teal)',
                                    cursor: toggling ? 'not-allowed' : 'pointer',
                                    opacity: toggling ? 0.5 : 1
                                }}
                            >
                                {toggling ? 'Changing...' : 'Change'}
                            </button>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: isPublic ? '#22c55e' : '#ef4444', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                            <span style={{ width: '8px', height: '8px', background: isPublic ? '#22c55e' : '#ef4444', borderRadius: '50%', display: 'inline-block' }}></span>
                            {isPublic ? 'Public' : 'Private'}
                        </div>
                    </div>
                    <Link to="/admin/profile" style={{ display: 'block', width: '100%', padding: '0.8rem', background: 'var(--text-main)', color: 'var(--bg-white)', textAlign: 'center', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
