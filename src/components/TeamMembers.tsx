import type { Profile } from '../services/profileService';

interface TeamMembersProps {
    profile: Profile;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ profile }) => {
    const members = profile.teamMembers || [];

    if (members.length === 0) return null;

    const getImageUrl = (member: any) => {
        if (member.imageUrl) return member.imageUrl;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=300`;
    };

    return (
        <section className="section section-indicator" id="team">
            <div className="container">
                <h2 className="ark-section__heading">Our Team</h2>
                <div className="ark-grid-auto">
                    {members.map((member) => (
                        <div key={member.name} className="ark-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1.5rem' }}>
                            <img
                                src={getImageUrl(member)}
                                alt={member.name}
                                style={{
                                    width: '120px', height: '120px', borderRadius: '50%',
                                    objectFit: 'cover', marginBottom: '1rem',
                                    border: '3px solid var(--border-color)',
                                    transition: 'border-color 0.3s',
                                }}
                                className="team-card__avatar"
                            />
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem' }}>{member.name}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamMembers;
