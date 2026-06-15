import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import type { Profile } from '../services/profileService';

interface HeroProps {
    profile: Profile;
}

const SvgServices = () => (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-slide-figure">
        <circle cx="100" cy="28" r="16" fill="var(--primary)" opacity="0.2" />
        <path d="M75 60 Q100 48 125 60 L135 90 Q100 78 65 90Z" fill="var(--primary)" opacity="0.15" />
        <rect x="48" y="80" width="24" height="40" rx="3" fill="var(--primary-teal)" opacity="0.3" />
        <rect x="80" y="88" width="24" height="32" rx="3" fill="var(--primary)" opacity="0.25" />
        <rect x="112" y="84" width="24" height="36" rx="3" fill="var(--primary-teal)" opacity="0.3" />
        <rect x="144" y="90" width="24" height="30" rx="3" fill="var(--primary)" opacity="0.2" />
        <circle cx="60" cy="100" r="6" fill="var(--primary)" opacity="0.4" />
        <circle cx="92" cy="104" r="6" fill="var(--primary-teal)" opacity="0.4" />
        <circle cx="124" cy="102" r="6" fill="var(--primary)" opacity="0.4" />
        <line x1="60" y1="100" x2="92" y2="104" stroke="var(--primary)" strokeWidth="1.5" opacity="0.3" />
        <line x1="92" y1="104" x2="124" y2="102" stroke="var(--primary-teal)" strokeWidth="1.5" opacity="0.3" />
        <path d="M148 78 Q156 74 164 78" stroke="var(--primary)" strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
);

const SvgDashboards = () => (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-slide-figure">
        <circle cx="100" cy="22" r="16" fill="var(--primary-red)" opacity="0.2" />
        <path d="M72 52 Q100 40 128 52 L136 76 Q100 62 64 76Z" fill="var(--primary-red)" opacity="0.12" />
        <rect x="40" y="65" width="50" height="50" rx="4" fill="var(--primary-red)" opacity="0.1" stroke="var(--primary-red)" strokeWidth="1.5" strokeOpacity="0.3" />
        <rect x="50" y="75" width="30" height="20" rx="2" fill="var(--primary-red)" opacity="0.25" />
        <rect x="50" y="100" width="12" height="8" rx="1" fill="var(--primary)" opacity="0.4" />
        <rect x="66" y="98" width="8" height="10" rx="1" fill="var(--primary-teal)" opacity="0.4" />
        <rect x="78" y="96" width="6" height="12" rx="1" fill="var(--primary-red)" opacity="0.4" />
        <rect x="108" y="65" width="50" height="50" rx="4" fill="var(--primary-red)" opacity="0.08" stroke="var(--primary-red)" strokeWidth="1.5" strokeOpacity="0.25" />
        <path d="M115 100 L118 90 L122 94 L128 82 L133 88 L140 78" stroke="var(--primary)" strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="140" cy="78" r="3" fill="var(--primary)" opacity="0.6" />
    </svg>
);

const SvgInnovations = () => (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-slide-figure">
        <circle cx="100" cy="30" r="16" fill="var(--primary-teal)" opacity="0.2" />
        <path d="M72 60 Q100 48 128 60 L136 82 Q100 68 64 82Z" fill="var(--primary-teal)" opacity="0.12" />
        <path d="M100 50 L100 70" stroke="var(--primary)" strokeWidth="2" opacity="0.5" />
        <circle cx="100" cy="82" r="18" fill="none" stroke="var(--primary)" strokeWidth="2" opacity="0.3" />
        <circle cx="100" cy="82" r="8" fill="var(--primary)" opacity="0.25" />
        <path d="M90 82 L96 82 L100 76 L104 88 L108 78 L112 82" stroke="var(--primary)" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
        <circle cx="66" cy="90" r="5" fill="var(--primary-teal)" opacity="0.3" />
        <circle cx="134" cy="90" r="5" fill="var(--primary-teal)" opacity="0.3" />
        <line x1="71" y1="90" x2="82" y2="85" stroke="var(--primary-teal)" strokeWidth="1.5" opacity="0.3" />
        <line x1="118" y1="85" x2="129" y2="90" stroke="var(--primary-teal)" strokeWidth="1.5" opacity="0.3" />
        <circle cx="100" cy="114" r="3" fill="var(--primary)" opacity="0.4" />
        <path d="M90 120 Q100 126 110 120" stroke="var(--primary-teal)" strokeWidth="1.5" fill="none" opacity="0.4" />
    </svg>
);

const SvgSolutions = () => (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-slide-figure">
        <circle cx="100" cy="26" r="16" fill="#2d2d2d" opacity="0.2" />
        <path d="M72 56 Q100 44 128 56 L136 78 Q100 64 64 78Z" fill="#2d2d2d" opacity="0.12" />
        <rect x="48" y="68" width="56" height="46" rx="3" fill="#2d2d2d" fillOpacity="0.08" stroke="#2d2d2d" strokeWidth="1.5" strokeOpacity="0.3" />
        <rect x="54" y="78" width="44" height="6" rx="1" fill="var(--primary)" opacity="0.3" />
        <rect x="54" y="88" width="30" height="4" rx="1" fill="var(--primary-teal)" opacity="0.3" />
        <rect x="54" y="96" width="36" height="4" rx="1" fill="var(--primary-red)" opacity="0.25" />
        <rect x="54" y="104" width="20" height="4" rx="1" fill="var(--primary)" opacity="0.2" />
        <rect x="118" y="72" width="36" height="42" rx="3" fill="#2d2d2d" fillOpacity="0.08" stroke="#2d2d2d" strokeWidth="1.5" strokeOpacity="0.25" />
        <rect x="124" y="78" width="24" height="18" rx="2" fill="var(--primary)" opacity="0.2" />
        <line x1="115" y1="88" x2="118" y2="88" stroke="var(--primary)" strokeWidth="2" opacity="0.4" />
        <line x1="115" y1="94" x2="118" y2="94" stroke="var(--primary-teal)" strokeWidth="2" opacity="0.4" />
        <rect x="90" y="116" width="20" height="4" rx="2" fill="#2d2d2d" opacity="0.3" />
    </svg>
);

const slides = [
    {
        title: 'Our ICT Services',
        description: 'Enterprise-grade IT solutions tailored to your business needs.',
        figure: <SvgServices />,
    },
    {
        title: 'Dashboards',
        description: 'Real-time analytics and monitoring dashboards for data-driven decisions.',
        figure: <SvgDashboards />,
    },
    {
        title: 'Our Innovations',
        description: 'Cutting-edge technology innovations driving digital transformation.',
        figure: <SvgInnovations />,
    },
    {
        title: 'Digital Solutions',
        description: 'End-to-end digital solutions from concept to deployment.',
        figure: <SvgSolutions />,
    },
];

const Hero: React.FC<HeroProps> = ({ profile }) => {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 8000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className="hero section" id="home">
            <div className="container">
                <div className="hero-grid">
                    {/* Left: Logo */}
                    <motion.div
                        className="hero-avatar-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {profile.avatar ? (
                            <img src={profile.avatar} alt="Profile" className="hero-avatar" />
                        ) : (
                            <div className="hero-avatar hero-avatar-placeholder">
                                {profile.firstName[0]}{profile.lastName[0]}
                            </div>
                        )}
                    </motion.div>

                    {/* Right: Image Slider */}
                    <div className="hero-slider">
                        <div className="hero-slider-viewport">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    className="hero-slide"
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -60 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="hero-slide-figure-wrap">
                                        {slides[current].figure}
                                    </div>
                                    <div className="hero-slide-content">
                                        <h3 className="hero-slide-title">{slides[current].title}</h3>
                                        <p className="hero-slide-desc">{slides[current].description}</p>
                                    </div>
                                    <div className="hero-slide-play">
                                        <FaPlay />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="hero-slider-nav">
                            <button className="hero-slider-arrow" onClick={prev} aria-label="Previous">
                                <FaChevronLeft />
                            </button>
                            <div className="hero-slider-dots">
                                {slides.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`hero-slider-dot ${i === current ? 'active' : ''}`}
                                        onClick={() => setCurrent(i)}
                                    />
                                ))}
                            </div>
                            <button className="hero-slider-arrow" onClick={next} aria-label="Next">
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
