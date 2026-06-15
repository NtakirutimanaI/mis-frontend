import Hero from '../../components/Hero';
import Experience from '../../components/Experience';
import Projects from '../../components/Projects';
import TeamMembers from '../../components/TeamMembers';
import Certifications from '../../components/Certifications';
import Contact from '../../components/Contact';
import { useOutletContext } from 'react-router-dom';
import type { Profile } from '../../services/profileService';

const Home = () => {
    // We receive the profile from the PublicLayout context
    const { profile } = useOutletContext<{ profile: Profile | null }>();

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-center p-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-200 mb-2">Service Unavailable</h1>
                    <p className="text-neutral-400">Unable to load portfolio data. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Hero profile={profile} />
            <Experience profile={profile} />
            <Projects profile={profile} />
            <TeamMembers profile={profile} />
            <Certifications profile={profile} />
            <Contact profile={profile} />
        </>
    );
};

export default Home;
