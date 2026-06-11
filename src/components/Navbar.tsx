import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Profile } from '../services/profileService';

interface NavbarProps {
    profile?: Profile | null;
}

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fullName = profile ? `${profile.firstName} ${profile.lastName}` : 'MAKE IT SOLUTIONS (MIS)';
    const role = profile?.title || 'ICT Company';

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    {/* Left: Name and Role */}
                    <Link to="/" className="navbar-brand">
                        <span className="brand-dot"></span>
                        <span className="brand-name">{fullName}</span>
                        <span className="brand-role">{role}</span>
                    </Link>

                    {/* Right: Navigation Links */}
                    <div className="navbar-links">
                        <a href="/#resume" className="nav-link">Company</a>
                        <span className="nav-separator">|</span>
                        <a href="/#projects" className="nav-link">Projects</a>
                        <span className="nav-separator">|</span>
                        <a href="/#contact" className="nav-link">Contact</a>
                        <span className="nav-separator">|</span>
                        <Link to="/login" className="nav-link" style={{ color: '#7BC043', fontWeight: 600 }}>Login</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
