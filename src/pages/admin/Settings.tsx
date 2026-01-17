import { useState } from 'react';
import { FaCog, FaPaintBrush, FaLock } from 'react-icons/fa';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Settings = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Password state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const submitPasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (passwordData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
            setLoading(false);
            return;
        }

        try {
            await authService.changePassword(passwordData);
            setMessage({ type: 'success', text: 'Password changed successfully.' });
            setPasswordData({ currentPassword: '', newPassword: '' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Settings</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage application preferences and system configuration.</p>
                </div>
            </div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        background: message.type === 'success' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(255, 82, 82, 0.1)',
                        color: message.type === 'success' ? '#2e8b57' : '#d32f2f',
                        border: `1px solid ${message.type === 'success' ? '#4ecdc4' : '#ff5252'}`
                    }}
                >
                    {message.text}
                </motion.div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {/* General Settings Card */}
                <div className="content-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                        <FaCog style={{ color: 'var(--primary-teal)' }} />
                        <h3 style={{ fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>General Preferences</h3>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Site Title</label>
                        <input className="form-input" defaultValue="Who Am I? Portfolio" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Admin Email</label>
                        <input className="form-input" value={user?.email || ''} disabled style={{ opacity: 0.7 }} />
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            Currently logged in as <strong>{user?.username}</strong> ({user?.role})
                        </p>
                    </div>
                </div>

                {/* Security Card - Change Password */}
                <div className="content-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                        <FaLock style={{ color: 'var(--primary-red)' }} />
                        <h3 style={{ fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>Security</h3>
                    </div>

                    <form onSubmit={submitPasswordChange}>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label className="form-label">Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                className="form-input"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                className="form-input"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
                            {loading ? 'Updating...' : 'Change Password'}
                        </button>
                    </form>
                </div>

                {/* Appearance Card */}
                <div className="content-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                        <FaPaintBrush style={{ color: 'var(--primary-yellow)' }} />
                        <h3 style={{ fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>Appearance</h3>
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--bg-body)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <input type="checkbox" defaultChecked />
                            Enable UI Animations
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
