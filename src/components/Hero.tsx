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
                            Hello
                        </motion.h1>

                        <motion.h3
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            A Bit About Me
                        </motion.h3>

                        <motion.p
                            className="hero-desc"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {profile.bio || "I'm a paragraph. Click here to add your own text and edit me. I'm a great place for you to tell a story and let your users know a little more about you."}
                        </motion.p>

                        <motion.div
                            className="hero-buttons"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a href="#resume" className="circle-btn btn-yellow">
                                Resume
                            </a>
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
