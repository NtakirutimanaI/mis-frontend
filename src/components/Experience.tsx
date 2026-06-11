import { FaLaptopCode, FaMobileAlt, FaCloud, FaDatabase, FaCogs, FaShieldAlt, FaChartLine, FaRobot, FaProjectDiagram } from 'react-icons/fa';
import type { Profile } from '../services/profileService';

const SERVICE_ICONS = [FaLaptopCode, FaMobileAlt, FaCloud, FaDatabase, FaCogs, FaShieldAlt, FaChartLine, FaRobot, FaProjectDiagram];

interface ExperienceProps {
    profile: Profile;
}

const Experience: React.FC<ExperienceProps> = ({ profile }) => {
    const formatDate = (date: string) => {
        const d = new Date(date);
        return `${d.getFullYear()}`; // Just year like the template
    };

    return (
        <section className="section" id="resume">
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>About MIS</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        {profile.yearsOfExperience} years of experience as {profile.title}
                    </p>
                </div>

                {/* How We Work */}
                <div className="resume-section">
                    <div className="resume-title">How<br />We Work</div>
                    <div className="resume-list">
                        {profile.experience.map((exp, idx) => (
                            <div key={idx} className="resume-item">
                                <div className="resume-date">
                                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                                </div>
                                <div className="resume-content">
                                    <h3>{exp.title}</h3>
                                    <p className="resume-desc">
                                        {exp.description || "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click 'Edit Text' or double click me to add your own content and make changes to the font."}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Our Technologies */}
                <div className="resume-section" style={{ borderTop: '1px solid #e0e0e0', paddingTop: '4rem' }}>
                    <div className="resume-title">Our<br />Technologies</div>
                    <div className="resume-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {Object.entries(profile.skills || {}).filter(([category]) =>
                            !['other'].includes(category)
                        ).map(([category, skills]) => (
                            <div key={category} style={{ background: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'capitalize', color: 'var(--primary-teal)' }}>
                                    {category.replace(/-/g, ' ')}
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {(skills || []).map(skill => (
                                        <span key={skill} style={{ background: 'var(--bg-body)', border: '1px solid var(--border-color)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500 }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {Object.keys(profile.skills || {}).length === 0 && (
                            <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>No skills added yet.</p>
                        )}
                    </div>
                </div>

                <div style={{ height: '4rem' }}></div>

                {/* Our Services */}
                {profile.education && profile.education.length > 0 && (
                    <div className="resume-section" style={{ borderTop: '1px solid #e0e0e0', paddingTop: '4rem' }}>
                        <div className="resume-title">Our<br />Services</div>
                        <div className="resume-list">
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {profile.education.map((edu, idx) => {
                                    const IconComponent = SERVICE_ICONS[idx % SERVICE_ICONS.length];
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                background: 'var(--bg-white)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '16px',
                                                padding: '2rem 1.5rem',
                                                transition: 'all 0.3s ease',
                                                cursor: 'default',
                                                position: 'relative',
                                                overflow: 'hidden',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.transform = 'translateY(-6px)';
                                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                                                e.currentTarget.style.borderColor = 'var(--primary)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.borderColor = 'var(--border-color)';
                                            }}
                                        >
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                borderRadius: '14px',
                                                background: 'linear-gradient(135deg, var(--primary) 0%, #5fa832 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontSize: '1.5rem',
                                                marginBottom: '1.25rem'
                                            }}>
                                                <IconComponent />
                                            </div>
                                            <h3 style={{
                                                fontSize: '1.15rem',
                                                fontWeight: 700,
                                                marginBottom: '0.5rem',
                                                color: 'var(--text-main)'
                                            }}>
                                                {edu.degree}
                                            </h3>
                                            {edu.institution && (
                                                <p style={{
                                                    fontSize: '0.85rem',
                                                    fontWeight: 600,
                                                    color: 'var(--primary)',
                                                    marginBottom: '0.75rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    {edu.institution}
                                                </p>
                                            )}
                                            {edu.description && (
                                                <p style={{
                                                    fontSize: '0.9rem',
                                                    color: 'var(--text-muted)',
                                                    lineHeight: '1.6',
                                                    margin: 0
                                                }}>
                                                    {edu.description}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </section>
    );
};

export default Experience;
