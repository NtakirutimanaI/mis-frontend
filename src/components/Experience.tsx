import { motion } from 'framer-motion';
import type { Profile } from '../services/profileService';

interface ExperienceProps {
    profile: Profile;
}

const Experience: React.FC<ExperienceProps> = ({ profile }) => {
    return (
        <section className="section section-indicator" id="resume">
            <div className="container">
                <motion.span
                    className="ark-section__sub"
                    style={{ display: 'inline-block', marginLeft: '30px', color: '#111' }}
                    animate={{ x: [-20, 20, -20] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    Who We Are
                </motion.span>
                <h2 className="ark-section__heading">About MIS</h2>

                {/* About Us */}
                <div className="ark-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)', margin: 0 }}>
                        {profile.about || profile.bio || "MAKE IT SOLUTIONS (MIS) is a leading ICT company in Rwanda specializing in web development, mobile applications, and digital transformation."}
                    </p>
                </div>

                {/* Our Technologies */}
                <div style={{ marginBottom: '3rem' }}>
                    <p className="ark-section__sub" style={{ color: '#111' }}>Our Technologies</p>
                    <div className="ark-grid-auto">
                        {Object.entries(profile.skills || {}).filter(([category]) =>
                            !['other'].includes(category)
                        ).map(([category, skills]) => (
                            <div key={category} className="ark-card" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'capitalize', color: 'var(--primary-teal)' }}>
                                    {category.replace(/-/g, ' ')}
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {(skills || []).map(skill => (
                                        <span key={skill} className="tech-pill">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {Object.keys(profile.skills || {}).length === 0 && (
                            <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>No skills added yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
