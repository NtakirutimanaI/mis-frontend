import type { Profile } from '../services/profileService';

interface ProjectsProps {
    profile: Profile;
}

const Projects: React.FC<ProjectsProps> = ({ profile }) => {
    const displayProjects = profile.projects || [];

    return (
        <section className="section section-indicator" id="projects">
            <div className="container">
                <h2 className="ark-section__heading">Projects</h2>
                <div className="ark-grid-3">
                    {displayProjects.map((project, index) => {
                        const projectUrl = project.url && !project.url.startsWith('http://') && !project.url.startsWith('https://')
                            ? `https://${project.url}`
                            : project.url;
                        const githubUrl = project.githubUrl && !project.githubUrl.startsWith('http://') && !project.githubUrl.startsWith('https://')
                            ? `https://${project.githubUrl}`
                            : project.githubUrl;

                        return (
                            <div key={index} className="ark-card" style={{ display: 'flex', flexDirection: 'column' }}>
                                {project.imageUrl ? (
                                    <img src={project.imageUrl} alt={project.name} className="ark-card__img" />
                                ) : (
                                    <div className="ark-card__img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)', color: 'var(--text-muted)' }}>
                                        No Image
                                    </div>
                                )}
                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{project.name}</h3>

                                    {(project.type || project.role) && (
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            {project.type && (
                                                <span><strong style={{ color: 'var(--text-main)' }}>Type:</strong> {project.type}</span>
                                            )}
                                            {project.role && (
                                                <span><strong style={{ color: 'var(--text-main)' }}>Role:</strong> {project.role}</span>
                                            )}
                                        </div>
                                    )}

                                    <p className="clamp-3" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0 }}>
                                        {project.description || "I'm a paragraph. Click here to add your own text and edit me."}
                                    </p>

                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '0.75rem' }}>
                                        {projectUrl && (
                                            <a href={projectUrl} target="_blank" rel="noopener noreferrer"
                                                style={{
                                                    fontSize: '0.85rem', padding: '0.4rem 1rem',
                                                    background: 'var(--primary)', color: '#000', borderRadius: '6px',
                                                    fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                }}>
                                                View Project
                                            </a>
                                        )}
                                        {githubUrl && (
                                            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                                                style={{
                                                    fontSize: '0.85rem', padding: '0.4rem 1rem',
                                                    border: '1px solid var(--border-color)', borderRadius: '6px',
                                                    color: 'var(--text-main)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                }}>
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {displayProjects.length === 0 && (
                    <p style={{ color: 'var(--text-muted)' }}>No projects added yet.</p>
                )}
            </div>
        </section>
    );
};

export default Projects;
