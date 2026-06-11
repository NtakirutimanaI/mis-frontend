import { motion } from 'framer-motion';
import type { Profile } from '../services/profileService';

interface HeroProps {
    profile: Profile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
    return (
        <section className="hero section" id="home">
            <div className="container">
                <div className="hero-grid">
                    {/* Left: Circular Avatar */}
                    <motion.div
                        className="hero-avatar-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {profile.avatar ? (
                            <img src={profile.avatar} alt="Profile" className="hero-avatar" />
                        ) : (
                            <div className="hero-avatar hero-avatar-placeholder">
                                {profile.firstName[0]}{profile.lastName[0]}
                            </div>
                        )}
                    </motion.div>

                    {/* Right: Text Content */}
                    <div className="hero-text-content">
                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {profile.greeting || 'Hello'}
                        </motion.h1>

                        <motion.h3
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {profile.aboutMeTitle || 'A Bit About Me'}
                        </motion.h3>

                        <motion.p
                            className="hero-desc"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {(() => {
                                const b = profile.bio;
                                if (!b) return "I'm a paragraph. Click here to add your own text and edit me. I'm a great place for you to tell a story and let your users know a little more about you.";
                                const ci = b.indexOf(':');
                                return ci !== -1 ? <><strong><u>{b.slice(0, ci)}</u></strong>{b.slice(ci)}</> : b;
                            })()}
                        </motion.p>

                        <motion.div
                            className="hero-buttons"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <a href="#resume" className="circle-btn btn-yellow">
                                    About MIS
                                </a>
                                {profile.cvUrl && (
                                    <a href={profile.cvUrl} download style={{ fontSize: '0.9rem', color: '#fff', background: 'var(--primary-teal)', fontWeight: 700, padding: '0.3rem 1rem', borderRadius: '20px', textDecoration: 'none', display: 'inline-block' }}>
                                        Download CV
                                    </a>
                                )}
                            </div>
                            <a href="#projects" className="circle-btn btn-red">
                                Projects
                            </a>
                            <a href="#contact" className="circle-btn btn-teal">
                                Contact
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
