import type { Profile } from '../services/profileService';

interface ProjectsProps {
    profile: Profile;
}

const Projects: React.FC<ProjectsProps> = ({ profile }) => {
    const projects = profile.projects || [];
    const displayProjects = projects.filter(p => p.published !== false);

    return (
        <section className="section" id="projects">
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Projects</h1>
                </div>

                <div>
                    {displayProjects.map((project, index) => (
                        <div key={index} className="project-item">
                            <div className="project-text">
                                <h3 className="project-name">{project.name}</h3>
                                <p className="project-desc-text">
                                    {project.description || "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or double click me to add your own content and make changes to the font."}
                                </p>
                                {project.url && (
                                    <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: 700 }}>
                                        View Project
                                    </a>
                                )}
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
