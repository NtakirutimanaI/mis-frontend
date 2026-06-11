import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await authService.register(form);
            const data = await authService.login({ email: form.email, password: form.password });
            login(data.accessToken, data.user);
            navigate('/admin');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#f1f5f9'
        }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ width: '100%', maxWidth: '480px', padding: '2rem' }}
            >
                <div style={{
                    background: '#fff', padding: '3rem', borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Create Account</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Register a new account</p>
                    </div>

                    {error && (
                        <div style={{
                            background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: '8px',
                            marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem'
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label className="form-label">First Name</label>
                                <div style={{ position: 'relative' }}>
                                    <FaUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input name="firstName" value={form.firstName} onChange={handleChange}
                                        className="form-input" style={{ paddingLeft: '3rem', width: '100%' }}
                                        placeholder="John" required />
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Last Name</label>
                                <input name="lastName" value={form.lastName} onChange={handleChange}
                                    className="form-input" placeholder="Doe" required />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Username</label>
                            <div style={{ position: 'relative' }}>
                                <FaUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input name="username" value={form.username} onChange={handleChange}
                                    className="form-input" style={{ paddingLeft: '3rem', width: '100%' }}
                                    placeholder="johndoe" required />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <FaEnvelope style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input type="email" name="email" value={form.email} onChange={handleChange}
                                    className="form-input" style={{ paddingLeft: '3rem', width: '100%' }}
                                    placeholder="user@example.com" required />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                                    className="form-input" style={{ paddingLeft: '3rem', paddingRight: '3rem', width: '100%' }}
                                    placeholder="••••••••" minLength={6} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={isLoading} className="btn-submit" style={{ margin: 0, padding: '1rem', fontSize: '1rem', marginTop: '0.5rem' }}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Already have an account? </span>
                        <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>Sign In</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
