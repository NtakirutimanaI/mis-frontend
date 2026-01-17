import type { Profile } from '../services/profileService';

interface ExperienceProps {
    profile: Profile;
}

const Experience: React.FC<ExperienceProps> = ({ profile }) => {
    const formatDate = (date: string) => {
        const d = new Date(date);
        return `${d.getFullYear()}`; // Just year like the template
    };

    const skillCategories = Object.keys(profile.skills);

    return (
        <section className="section" id="resume">
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Resume</h1>
                </div>

                {/* Work Experience */}
                <div className="resume-section">
                    <div className="resume-title">Work<br />Experience</div>
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

                <div style={{ height: '4rem' }}></div>

                {/* Education */}
                {profile.education && profile.education.length > 0 && (
                    <div className="resume-section" style={{ borderTop: '1px solid #e0e0e0', paddingTop: '4rem' }}>
                        <div className="resume-title">Education</div>
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

                <div style={{ height: '4rem' }}></div>

                {/* Skills & Expertise */}
                <div className="resume-section" style={{ borderTop: '1px solid #e0e0e0', paddingTop: '4rem' }}>
                    <div className="resume-title">Skills<br />& Expertise</div>
                    <div className="resume-list" style={{ gap: '2rem' }}>
                        {skillCategories.map((cat) => (
                            <div key={cat} className="resume-item" style={{ gridTemplateColumns: '150px 1fr' }}>
                                <div className="resume-date" style={{ textTransform: 'capitalize', fontWeight: 700 }}>
                                    {cat}
                                </div>
                                <div className="resume-content">
                                    <p className="resume-desc" style={{ lineHeight: '1.8' }}>
                                        {profile.skills[cat].join('  •  ')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
