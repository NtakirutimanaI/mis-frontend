import type { Profile } from '../services/profileService';

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

                {/* Working Hours */}
                {profile.education && profile.education.length > 0 && (
                    <div className="resume-section" style={{ borderTop: '1px solid #e0e0e0', paddingTop: '4rem' }}>
                        <div className="resume-title">Working Hours</div>
                        <div className="resume-list">
                            {profile.education.map((edu, idx) => (
                                <div key={idx} className="resume-item">
                                    <div className="resume-date">
                                        {edu.graduationYear}
                                    </div>
                                    <div className="resume-content">
                                        <h3>{edu.institution}</h3>
                                        <p className="resume-desc">{edu.degree}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


            </div>
        </section>
    );
};

export default Experience;
