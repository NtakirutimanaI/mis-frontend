import type { Profile } from '../services/profileService';

interface ProjectsProps {
    profile: Profile;
}

const Projects: React.FC<ProjectsProps> = ({ profile }) => {
    const displayProjects = profile.projects || [];

    return (
        <section className="section" id="projects">
            <div className="container">
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Projects</h1>
                </div>

                <div>
                    {displayProjects.map((project, index) => (
                        <div key={index} className="project-item">
                            <div className="project-text">
                                <h3 className="project-name">{project.name}</h3>

                                {/* Type and Role on same row */}
                                {(project.type || project.role) && (
                                    <div style={{
                                        display: 'flex',
                                        gap: '1.5rem',
                                        marginTop: '0.5rem',
                                        marginBottom: '1rem',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-muted)'
                                    }}>
                                        {project.type && (
                                            <span>
                                                <strong style={{ color: 'var(--text-main)' }}>Type:</strong> {project.type}
                                            </span>
                                        )}
                                        {project.role && (
                                            <span>
                                                <strong style={{ color: 'var(--text-main)' }}>Role:</strong> {project.role}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <p className="project-desc-text">
                                    {project.description || "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click \"Edit Text\" or double click me to add your own content and make changes to the font."}
                                </p>
                                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                                    {project.url && (
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                            View Project
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', fontWeight: 600 }}>
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="project-image-container">
                                {project.imageUrl ? (
                                    <img src={project.imageUrl} alt={project.name} className="project-image" />
                                ) : (
                                    <div className="project-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb', color: '#9ca3af' }}>
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
