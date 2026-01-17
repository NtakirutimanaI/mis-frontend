import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import type { Profile } from '../services/profileService';

interface PublicLayoutProps {
    profile: Profile | null;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ profile }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar profile={profile} />
            <main className="flex-grow">
                <Outlet context={{ profile }} />
            </main>
            <ChatWidget />
            {profile && <Footer profile={profile} />}
        </div>
    );
};

export default PublicLayout;
