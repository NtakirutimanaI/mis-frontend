import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaEye, FaEnvelope, FaProjectDiagram, FaUserTie, FaCode, FaGraduationCap,
    FaBriefcase, FaCertificate, FaGlobe, FaChartLine, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { profileService } from '../../services/profileService';
import type { Profile } from '../../services/profileService';
import Loading from '../../components/Loading';

const AdminDashboard = () => {
    const [statsData, setStatsData] = useState({
        views: 0,
        messages: 0,
        projects: 0,
        clients: 0,
        skills: 0
    });

    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPublic, setIsPublic] = useState(true);
    const [toggling, setToggling] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [stats, profileData] = await Promise.all([
                    profileService.getStats(),
                    profileService.getMyProfile()
                ]);
                setStatsData(stats);
                setProfile(profileData);
                setIsPublic(profileData.isPublic !== false);
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

    const publishedProjects = profile?.projects?.filter(p => p.published).length || 0;
    const draftProjects = (profile?.projects?.length || 0) - publishedProjects;

    const mainStats = [
        {
            label: 'Total Views',
            value: statsData.views.toLocaleString(),
            icon: <FaEye />,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            change: '+12.5%',
            trend: 'up'
        },
        {
            label: 'Messages',
            value: statsData.messages.toString(),
            icon: <FaEnvelope />,
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            label: 'Projects',
            value: statsData.projects.toString(),
            icon: <FaProjectDiagram />,
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            subtext: `${publishedProjects} published`,
            change: `${draftProjects} drafts`
        },
        {
            label: 'Total Skills',
            value: statsData.skills.toString(),
            icon: <FaCode />,
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
    ];

    return (
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
            {/* Welcome Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span>Dashboard Overview</span>
                    <span style={{
                        fontSize: '0.7rem',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        background: isPublic ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: isPublic ? '#22c55e' : '#ef4444',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isPublic ? '#22c55e' : '#ef4444' }} />
                        {isPublic ? 'Live' : 'Offline'}
                    </span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                    Welcome back! Here's what's happening with your portfolio.
                </p>
            </div>

            {/* Main Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {mainStats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            background: 'var(--bg-white)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '100px',
                            height: '100px',
                            background: stat.gradient,
                            borderRadius: '50%',
                            opacity: 0.1,
                            transform: 'translate(30%, -30%)'
                        }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '12px',
                                background: stat.gradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.4rem'
                            }}>
                                {stat.icon}
                            </div>
                        </div>

                        <div>
                            <h3 style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                margin: '0 0 0.3rem 0',
                                background: stat.gradient,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                {stat.value}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0', fontWeight: 500 }}>
                                {stat.label}
                            </p>
                            {stat.subtext && (
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                                    {stat.subtext}
                                </p>
                            )}
                            {stat.change && (
                                <p style={{ fontSize: '0.8rem', color: stat.trend === 'up' ? '#22c55e' : 'var(--text-muted)', margin: 0, fontWeight: 600 }}>
                                    {stat.change}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {/* Profile Quick Stats */}
                <div className="content-card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <FaUserTie style={{ color: 'var(--primary-yellow)' }} /> Profile Status
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                        {/* Visibility */}
                        <div style={{ padding: '1rem', background: 'var(--bg-body)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Portfolio Visibility</span>
                                <button
                                    onClick={toggleVisibility}
                                    disabled={toggling}
                                    style={{
                                        fontSize: '0.75rem',
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '6px',
                                        background: 'var(--primary-teal)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: toggling ? 'not-allowed' : 'pointer',
                                        opacity: toggling ? 0.5 : 1,
                                        fontWeight: 600
                                    }}
                                >
                                    {toggling ? 'Changing...' : 'Toggle'}
                                </button>
                            </div>
                            <div style={{
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                color: isPublic ? '#22c55e' : '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: isPublic ? '#22c55e' : '#ef4444' }} />
                                {isPublic ? 'Public' : 'Private'}
                            </div>
                        </div>

                        {/* Profile Completion */}
                        <div style={{ padding: '1rem', background: 'var(--bg-body)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                            <div style={{ marginBottom: '0.8rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Profile Completion</span>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>85%</span>
                                </div>
                                <div style={{
                                    height: '8px',
                                    background: 'var(--border-color)',
                                    borderRadius: '8px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: '85%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, var(--primary-yellow) 0%, var(--primary-teal) 100%)',
                                        borderRadius: '8px'
                                    }} />
                                </div>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                                Add certifications to complete your profile
                            </p>
                        </div>
                    </div>

                    <Link to="/admin/profile" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '0.9rem',
                        background: 'linear-gradient(135deg, var(--primary-yellow) 0%, var(--primary-teal) 100%)',
                        color: 'white',
                        textAlign: 'center',
                        borderRadius: '8px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.3s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Edit Profile <FaArrowRight />
                    </Link>
                </div>
            </div>

            {/* System Overview */}
            <div className="content-card" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <FaChartLine style={{ color: 'var(--primary-teal)' }} /> System Overview
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }}>
                    {/* Education */}
                    <div style={{ padding: '1rem', background: 'var(--bg-body)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <FaGraduationCap />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                                    {profile?.education?.length || 0}
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Education</p>
                            </div>
                        </div>
                    </div>

                    {/* Experience */}
                    <div style={{ padding: '1rem', background: 'var(--bg-body)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <FaBriefcase />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                                    {profile?.experience?.length || 0}
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Experience</p>
                            </div>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div style={{ padding: '1rem', background: 'var(--bg-body)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <FaCertificate />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                                    {profile?.certifications?.length || 0}
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Certificates</p>
                            </div>
                        </div>
                    </div>

                    {/* Languages */}
                    <div style={{ padding: '1rem', background: 'var(--bg-body)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <FaGlobe />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                                    {profile?.languages?.length || 0}
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Languages</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
