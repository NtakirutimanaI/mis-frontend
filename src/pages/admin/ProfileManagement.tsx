import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { FaUser, FaBriefcase, FaCode, FaProjectDiagram } from 'react-icons/fa';
import { profileService } from '../../services/profileService';
import type { Profile } from '../../services/profileService';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';

// Import Tabs
import GeneralTab from './profile-sections/GeneralTab';
import ExperienceTab from './profile-sections/ExperienceTab';
import SkillsTab from './profile-sections/SkillsTab';
import ProjectsTab from './profile-sections/ProjectsTab';

const ProfileManagement = () => {
    const { searchQuery } = useOutletContext<{ searchQuery: string }>();
    const { updateUser } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'general' | 'experience' | 'skills' | 'projects'>('general');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await profileService.getMyProfile();
            setProfile(data);
            // Update global auth user state to reflect avatar in header
            updateUser({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                avatar: data.avatar
            });
        } catch (error) {
            console.error('Failed to load profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = (updatedProfile: Profile) => {
        setProfile(updatedProfile);
        // Update global auth user state to reflect changes in header immediately
        updateUser({
            firstName: updatedProfile.firstName,
            lastName: updatedProfile.lastName,
            email: updatedProfile.email,
            avatar: updatedProfile.avatar
        });
    };

    if (loading) return <Loading />;
    if (!profile) return <div style={{ textAlign: 'center', padding: '2rem' }}>Failed to load profile</div>;

    const tabs = [
        { id: 'general', label: 'General Info', icon: <FaUser /> },
        { id: 'experience', label: 'Experience & Edu', icon: <FaBriefcase /> },
        { id: 'skills', label: 'Skills', icon: <FaCode /> },
        { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    ] as const;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Profile Management</h1>
                <p style={{ color: 'var(--text-muted)' }}>Update your portfolio content and settings</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Mobile/Desktop Tabs - Responsive check usually involves media queries, 
                    but for now standard flex is fine (horizontal on mobile might be better, but vertical is okay) */}
                <div className="profile-wrapper" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

                    {/* Sidebar Navigation for Tabs */}
                    <div className="content-card profile-sidebar" style={{ padding: '0.5rem' }}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    width: '100%', padding: '0.8rem 1rem',
                                    border: 'none', background: activeTab === tab.id ? 'var(--primary-yellow)' : 'transparent',
                                    color: activeTab === tab.id ? '#000' : 'var(--text-muted)',
                                    fontWeight: activeTab === tab.id ? 700 : 500,
                                    borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div style={{ flex: 1, minWidth: '0' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'general' && (
                                    <GeneralTab profile={profile} onUpdate={handleProfileUpdate} />
                                )}
                                {activeTab === 'experience' && (
                                    <ExperienceTab profile={profile} onUpdate={handleProfileUpdate} searchQuery={searchQuery} />
                                )}
                                {activeTab === 'skills' && (
                                    <SkillsTab profile={profile} onUpdate={handleProfileUpdate} searchQuery={searchQuery} />
                                )}
                                {activeTab === 'projects' && (
                                    <ProjectsTab profile={profile} onUpdate={handleProfileUpdate} searchQuery={searchQuery} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileManagement;
