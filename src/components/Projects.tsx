import type { Profile } from '../services/profileService';

interface ProjectsProps {
    profile: Profile;
}

const Projects: React.FC<ProjectsProps> = ({ profile }) => {
    const displayProjects = profile.projects || [];

    return (
        <section className="section" id="projects">
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
                            <div key={index} className="ark-card">
                                {project.imageUrl ? (
                                    <img src={project.imageUrl} alt={project.name} className="ark-card__img" />
                                ) : (
                                    <div className="ark-card__img">
                                        No Image
                                    </div>
                                )}
                                <div className="ark-card__body">
                                    <h3>{project.name}</h3>

                                    {(project.type || project.role) && (
                                        <div>
                                            {project.type && (
                                                <span><strong>Type:</strong> {project.type}</span>
                                            )}
                                            {project.role && (
                                                <span><strong>Role:</strong> {project.role}</span>
                                            )}
                                        </div>
                                    )}

                                    {project.technologies && project.technologies.length > 0 && (
                                        <div>
                                            {project.technologies.map((tech: string) => (
                                                <span key={tech} className="tech-pill">{tech}</span>
                                            ))}
                                        </div>
                                    )}

                                    <p className="clamp-3">
                                        {project.description || "I'm a paragraph. Click here to add your own text and edit me."}
                                    </p>

                                    <div>
                                        {projectUrl && (
                                            <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                                                View Project
                                            </a>
                                        )}
                                        {githubUrl && (
                                            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
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
                    <p>No projects added yet.</p>
                )}
            </div>
        </section>
    );
};

export default Projects;
