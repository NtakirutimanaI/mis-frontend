import { useState, useRef } from 'react';

import { FaSave, FaGlobe, FaTwitter, FaLinkedin, FaGithub, FaCamera } from 'react-icons/fa';
import type { Profile } from '../../../services/profileService';
import { profileService } from '../../../services/profileService';
import { useToast } from '../../../context/ToastContext';

interface GeneralTabProps {
    profile: Profile;
    onUpdate: (updatedProfile: Profile) => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ profile, onUpdate }) => {
    const [formData, setFormData] = useState(profile);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                showToast('Image must be smaller than 2MB', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('=== PROFILE UPDATE ATTEMPT ===');
            console.log('Full form data:', JSON.stringify(formData, null, 2));

            // Whitelist approach: only send fields that are allowed in UpdateProfileDto
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                avatar: formData.avatar,
                bio: formData.bio,
                phone: formData.phone,
                title: formData.title,
                yearsOfExperience: formData.yearsOfExperience,
                location: formData.location,
                website: formData.website,
                availableForHire: formData.availableForHire,
                isPublic: formData.isPublic,
                education: formData.education,
                experience: formData.experience,
                skills: formData.skills,
                projects: formData.projects,
                certifications: formData.certifications,
                languages: formData.languages,
                socialLinks: formData.socialLinks,
            };

            console.log('Data being sent to API (whitelisted fields only):', JSON.stringify(updateData, null, 2));

            const updated = await profileService.updateProfile(updateData);

            console.log('=== UPDATE SUCCESSFUL ===');
            console.log('Updated profile:', updated);

            onUpdate(updated);
            showToast('Profile updated successfully!', 'success');
        } catch (err: any) {
            console.error('=== UPDATE FAILED ===');
            console.error('Full error object:', err);
            console.error('Error response:', err.response);
            console.error('Error response data:', err.response?.data);
            console.error('Error message:', err.message);
            console.error('Error status:', err.response?.status);
            console.error('Error headers:', err.response?.headers);

            const errorMsg = err.response?.data?.message || err.message || 'Failed to update profile. Please try again.';
            showToast(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>


            <div className="content-card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Basic Information
                </h3>

                {/* Avatar Section */}
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', cursor: 'pointer', position: 'relative', flexShrink: 0 }}
                    >
                        {formData.avatar ? (
                            <img
                                src={formData.avatar}
                                alt="Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error'; }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #aaa', color: '#666', fontWeight: 600 }}>
                                No Image
                            </div>
                        )}
                        <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--primary-teal)', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', border: '2px solid var(--bg-white)' }}>
                            <FaCamera size={14} />
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <div className="form-group">
                            <label className="form-label">Profile Image (Upload or URL)</label>
                            <input
                                name="avatar"
                                value={formData.avatar || ''}
                                onChange={handleChange}
                                placeholder="https://example.com/my-photo.jpg (or click avatar to upload)"
                                className="form-input"
                                style={{ width: '100%' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.4' }}>
                                Click the circle to upload an image from your device (max 2MB), or paste a direct URL.
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Professional Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">Experience (Years)</label>
                        <input
                            name="yearsOfExperience"
                            type="number"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Bio (Markdown Supported)</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="form-textarea"
                        rows={6}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label className="form-label mb-0">Availability Status</label>
                            <span style={{ fontSize: '0.85rem', color: formData.availableForHire ? 'var(--primary-teal)' : 'var(--text-muted)' }}>
                                {formData.availableForHire ? "Available to Hire" : "Not Available"}
                            </span>
                        </div>
                        <select
                            name="availableForHire"
                            value={String(formData.availableForHire)}
                            onChange={(e) => setFormData(prev => ({ ...prev, availableForHire: e.target.value === 'true' }))}
                            className="form-select"
                        >
                            <option value="true">Available for Hire</option>
                            <option value="false">Currently Employed / Unavailable</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="content-card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Social Links & Config
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <FaGithub style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            name="github"
                            value={formData.socialLinks?.github || ''}
                            onChange={handleSocialChange}
                            placeholder="GitHub URL"
                            className="form-input"
                            style={{ paddingLeft: '2.5rem', width: '100%' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <FaLinkedin style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            name="linkedin"
                            value={formData.socialLinks?.linkedin || ''}
                            onChange={handleSocialChange}
                            placeholder="LinkedIn URL"
                            className="form-input"
                            style={{ paddingLeft: '2.5rem', width: '100%' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <FaTwitter style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            name="twitter"
                            value={formData.socialLinks?.twitter || ''}
                            onChange={handleSocialChange}
                            placeholder="Twitter URL"
                            className="form-input"
                            style={{ paddingLeft: '2.5rem', width: '100%' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <FaGlobe style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            name="website"
                            value={formData.website || ''}
                            onChange={handleChange}
                            placeholder="Personal Website URL"
                            className="form-input"
                            style={{ paddingLeft: '2.5rem', width: '100%' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ position: 'sticky', bottom: '1.5rem', zIndex: 10, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                >
                    {loading ? 'Saving...' : <><FaSave /> Save Changes</>}
                </button>
            </div>
        </form>
    );
};

export default GeneralTab;
