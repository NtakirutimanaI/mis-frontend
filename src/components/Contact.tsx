import { useState } from 'react';
import { profileService, type ContactMessage, type Profile } from '../services/profileService';
import { useToast } from '../context/ToastContext';

interface ContactProps {
    profile: Profile;
}

const Contact: React.FC<ContactProps> = ({ profile }) => {
    const { showToast } = useToast();
    // Local state for form fields including split name
    const [localData, setLocalData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        company: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalData({ ...localData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Construct the payload expected by the backend
        // Only include fields that have values (don't send empty strings)
        const payload: ContactMessage = {
            name: `${localData.firstName} ${localData.lastName}`.trim(),
            email: localData.email,
            message: localData.message,
        };

        // Add optional fields only if they have values
        if (localData.phone && localData.phone.trim()) {
            payload.phone = localData.phone.trim();
        }
        if (localData.subject && localData.subject.trim()) {
            payload.subject = localData.subject.trim();
        }
        if (localData.company && localData.company.trim()) {
            payload.company = localData.company.trim();
        }

        console.log('📧 Sending contact message...', payload);

        try {
            const response = await profileService.sendContactMessage(payload);
            console.log('✅ Message sent successfully:', response);
            setStatus('success');
            // Reset form
            setLocalData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '', company: '' });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 5000);
        } catch (error: any) {
            console.error('❌ Failed to send message:', error);
            const errMsg = error?.response?.data?.message;
            const displayMsg = Array.isArray(errMsg) ? errMsg.join('. ') : (errMsg || error?.message || 'Something went wrong');
            setStatus('error');
            showToast(displayMsg, 'error');

            // Reset error message after 5 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 5000);
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
                                    <input type="text" name="firstName" className="form-input" required value={localData.firstName} onChange={handleChange} placeholder="John" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Last Name *</label>
                                    <input type="text" name="lastName" className="form-input" required value={localData.lastName} onChange={handleChange} placeholder="Doe" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Email *</label>
                                    <input type="email" name="email" className="form-input" required value={localData.email} onChange={handleChange} placeholder="john@example.com" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <input type="text" name="subject" className="form-input" value={localData.subject} onChange={handleChange} placeholder="What's this about?" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea name="message" className="form-textarea" required value={localData.message} onChange={handleChange} rows={6} placeholder="Tell me about your project..."></textarea>
                            </div>

                            <button type="submit" className="btn-submit" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Sending...' : 'Submit'}
                            </button>

                            {status === 'success' && (
                                <p style={{ color: 'green', marginTop: '1rem', fontWeight: 600 }}>
                                    ✅ Message sent successfully! I'll get back to you soon.
                                </p>
                            )}
                            {status === 'error' && (
                                <p style={{ color: 'red', marginTop: '1rem', fontWeight: 600 }}>
                                    ❌ Failed to send message. Please try again.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
