import { useState, useEffect } from 'react';
import { profileService } from '../../services/profileService';
import type { Profile } from '../../services/profileService';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';
import GeneralTab from './profile-sections/GeneralTab';

const ProfileManagement = () => {
    const { updateUser } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadProfile(); }, []);

    const loadProfile = async () => {
        try {
            const data = await profileService.getMyProfile();
            setProfile(data);
            updateUser({ firstName: data.firstName, lastName: data.lastName, email: data.email, avatar: data.avatar });
        } catch (error) {
            console.error('Failed to load profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = (updatedProfile: Profile) => {
        setProfile(updatedProfile);
        updateUser({ firstName: updatedProfile.firstName, lastName: updatedProfile.lastName, email: updatedProfile.email, avatar: updatedProfile.avatar });
    };

    if (loading) return <Loading />;
    if (!profile) return <div style={{ textAlign: 'center', padding: '2rem' }}>Failed to load profile</div>;

    return (
        <div>
            <GeneralTab profile={profile} onUpdate={(updatedProfile) => { handleProfileUpdate(updatedProfile); window.dispatchEvent(new CustomEvent('profile-updated')); }} />
        </div>
    );
};

export default ProfileManagement;
