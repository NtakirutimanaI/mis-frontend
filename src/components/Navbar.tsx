import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setIsScrolling(true);
            clearTimeout(scrollTimer.current);
            scrollTimer.current = setTimeout(() => setIsScrolling(false), 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimer.current);
        };
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    {/* Left: Brand that appears only while scrolling */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        opacity: isScrolling ? 1 : 0,
                        transform: isScrolling ? 'translateY(0)' : 'translateY(-8px)',
                        transition: 'opacity 0.25s ease, transform 0.25s ease',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                    }}>
                        <span style={{
                            width: '12px', height: '12px', background: 'var(--primary)',
                            borderRadius: '50%', display: 'inline-block', flexShrink: 0,
                        }} />
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                            MAKE IT SOLUTIONS (MIS)
                        </span>
                    </div>

                    {/* Right: Navigation Links */}
                    <div className="navbar-links" style={{ marginLeft: 'auto' }}>
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
