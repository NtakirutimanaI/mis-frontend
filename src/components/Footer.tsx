import { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaArrowUp } from 'react-icons/fa';
import type { Profile } from '../services/profileService';

interface FooterProps {
    profile: Profile;
}

const Footer: React.FC<FooterProps> = ({ profile }) => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            if (!showScroll && window.pageYOffset > 400) {
                setShowScroll(true);
            } else if (showScroll && window.pageYOffset <= 400) {
                setShowScroll(false);
            }
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [showScroll]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-item">
                        <h4>Phone</h4>
                        <p>{profile.phone || '123-456-7890'}</p>
                    </div>
                    <div className="footer-item">
                        <h4>Email</h4>
                        <p>{profile.email}</p>
                    </div>
                    <div className="footer-item">
                        <h4>Follow Me</h4>
                        <div className="footer-social">
                            {profile.socialLinks.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
                            {profile.socialLinks.twitter && <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
                            {profile.socialLinks.github && <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
                        </div>
                    </div>
                    <div className="footer-item footer-copyright">
                        <p>© {new Date().getFullYear()} By {profile.firstName} {profile.lastName}</p>
                        <p className="footer-powered">{profile.poweredBy || 'Powered and secured by MIS'}</p>
                    </div>
                </div>
            </div>

            {/* Fixed Scroll To Top Button */}
            {showScroll && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '2.3rem', /* Aligned with ChatWidget which is 2rem */
                        right: '7rem', /* Spaced to the left of ChatWidget (which is 2rem + 60px width + gap) */
                        zIndex: 9990,
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#fff',
                        color: '#000',
                        border: '2px solid #000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <FaArrowUp />
                </button>
            )}
        </footer>
    );
};

export default Footer;
