import { useState } from 'react';
import { profileService, type ContactMessage, type Profile } from '../services/profileService';

interface ContactProps {
    profile: Profile;
}

const Contact: React.FC<ContactProps> = ({ profile }) => {
    // Local state for form fields including split name
    const [localData, setLocalData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalData({ ...localData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Construct the payload expected by the backend
        const payload: ContactMessage = {
            name: `${localData.firstName} ${localData.lastName}`.trim(),
            email: localData.email,
            phone: localData.phone,
            subject: localData.subject,
            message: localData.message,
            company: '' // Optional
        };

        try {
            await profileService.sendContactMessage(payload);
            setStatus('success');
            // Reset form
            setLocalData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="section" id="contact" style={{ borderBottom: 'none', padding: '60px 0' }}>
            <div className="container">
                <div className="contact-section">
                    <div className="contact-left">
                        <h2>Contact</h2>
                        <p style={{ maxWidth: '300px' }}>Looking forward to hearing from you</p>

                        <div className="contact-details">
                            <div className="contact-detail-group">
                                <span className="contact-label">Phone</span>
                                <div>{profile.phone || '123-456-7890'}</div>
                            </div>
                            <div className="contact-detail-group">
                                <span className="contact-label">Email</span>
                                <div>{profile.email}</div>
                            </div>
                            <div className="contact-detail-group">
                                <span className="contact-label">Location</span>
                                <div>{profile.location}</div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-right">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">First Name *</label>
                                    <input type="text" name="firstName" className="form-input" required value={localData.firstName} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Last Name *</label>
                                    <input type="text" name="lastName" className="form-input" required value={localData.lastName} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Email *</label>
                                    <input type="email" name="email" className="form-input" required value={localData.email} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <input type="text" name="subject" className="form-input" value={localData.subject} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea name="message" className="form-textarea" required value={localData.message} onChange={handleChange} rows={6}></textarea>
                            </div>

                            <button type="submit" className="btn-submit" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Sending...' : 'Submit'}
                            </button>

                            {status === 'success' && <p style={{ color: 'green', marginTop: '1rem' }}>Message sent successfully!</p>}
                            {status === 'error' && <p style={{ color: 'red', marginTop: '1rem' }}>Failed to send message.</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
