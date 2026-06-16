import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    {/* Left: Brand Tag */}
                    <span className="nav-brand-tag">
                        <span style={{
                            width: '10px', height: '10px', background: 'var(--primary)',
                            borderRadius: '50%', display: 'inline-block', flexShrink: 0,
                        }} />
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em', color: 'var(--primary)' }}>
                            Think. Create. Connect.
                        </span>
                    </span>
                    {/* Right: Navigation Links */}
                    <div className="navbar-links">
                        <a href="/#resume" className="nav-link">Company</a>
                        <span className="nav-separator">|</span>
                        <a href="/#offerings" className="nav-link">Services</a>
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
