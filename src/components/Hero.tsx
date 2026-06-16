import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Profile } from '../services/profileService';

interface HeroProps {
    profile: Profile;
}

interface SlideContent {
    title: string;
    body: string;
    color: string;
}

const writingLines: SlideContent[] = [
    {
        color: '#7BC043',
        title: 'ICT SERVICES',
        body: 'End-to-end ICT infrastructure including networking, cloud solutions, and enterprise IT support tailored to keep your business running securely and efficiently.',
    },
    {
        color: '#ff5252',
        title: 'DASHBOARDS',
        body: 'Real-time analytics dashboards and KPI reporting systems that transform raw data into actionable insights for informed decision-making.',
    },
    {
        color: '#4ecdc4',
        title: 'INNOVATIONS',
        body: 'Cutting-edge solutions in Artificial Intelligence, IoT, and smart systems designed to drive digital transformation and competitive advantage.',
    },
    {
        color: '#2d2d2d',
        title: 'DIGITAL SOLUTIONS',
        body: 'Full-stack web and mobile development, ERP systems, and custom software engineering to digitize and streamline your business operations.',
    },
];

const sideSlides: SlideContent[] = [
    {
        color: '#7BC043',
        title: 'ABOUT US',
        body: 'We are a team of passionate technologists dedicated to delivering innovative solutions that empower businesses to thrive in the digital age. Our expertise spans infrastructure, software, and strategy.',
    },
    {
        color: '#4ecdc4',
        title: 'OUR MISSION',
        body: 'To empower organizations through cutting-edge technology and digital transformation, enabling them to achieve more with smarter, scalable, and secure systems.',
    },
];

const SlideText: React.FC<{ data: SlideContent }> = ({ data }) => (
    <div className="hero-slide-text">
        <h2 className="hero-slide-title">{data.title}</h2>
        <p className="hero-slide-body">{data.body}</p>
    </div>
);

const slides = [
    { data: writingLines[0], bg: 'https://picsum.photos/seed/heromain1/800/420' },
    { data: writingLines[1], bg: 'https://picsum.photos/seed/heromain2/800/420' },
    { data: writingLines[2], bg: 'https://picsum.photos/seed/heromain3/800/420' },
    { data: writingLines[3], bg: 'https://picsum.photos/seed/heromain4/800/420' },
    { data: sideSlides[0], bg: 'https://picsum.photos/seed/heroside2/800/420' },
    { data: sideSlides[1], bg: 'https://picsum.photos/seed/heroside3/800/420' },
];


const Hero: React.FC<HeroProps> = ({ profile }) => {
    const [current, setCurrent] = useState(0);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [showNav, setShowNav] = useState(false);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const autoTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    const showNavTemporarily = useCallback(() => {
        setShowNav(true);
        clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setShowNav(false), 3000);
    }, []);

    const handleMouseLeave = useCallback(() => {
        clearTimeout(hideTimer.current);
        setShowNav(false);
    }, []);

    useEffect(() => {
        return () => clearTimeout(hideTimer.current);
    }, []);

    const next = useCallback(() => {
        setCurrent((prev) => (prev < 3 ? prev + 1 : 0));
    }, []);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev > 0 ? prev - 1 : 3));
    }, []);

    useEffect(() => {
        autoTimer.current = setInterval(next, 12000);
        return () => clearInterval(autoTimer.current);
    }, [next]);

    const sideCardEnter = useCallback((index: number) => {
        setHoveredCard(index);
        clearInterval(autoTimer.current);
    }, []);

    const sideCardLeave = useCallback(() => {
        setHoveredCard(null);
        autoTimer.current = setInterval(next, 12000);
    }, [next]);

    const displayIndex = hoveredCard !== null ? hoveredCard : current;

    const handlePrev = useCallback(() => {
        prev();
        setHoveredCard(null);
        clearInterval(autoTimer.current);
        autoTimer.current = setInterval(next, 12000);
    }, [prev, next]);

    const handleNext = useCallback(() => {
        next();
        setHoveredCard(null);
        clearInterval(autoTimer.current);
        autoTimer.current = setInterval(next, 12000);
    }, [next]);

    return (
        <section
            className={`hero section${showNav ? ' show-nav' : ''}`}
            id="home"
            onMouseMove={showNavTemporarily}
            onMouseLeave={handleMouseLeave}
        >
            <div className="container">
                <div className="hero-grid">
                    {/* Left: Logo */}
                    <div className="hero-left-col">
                        <div className="hero-avatar-container">
                            {profile.avatar ? (
                                <img src={profile.avatar} alt="Profile" className="hero-avatar" />
                            ) : (
                                <div className="hero-avatar hero-avatar-placeholder">
                                    {profile.firstName[0]}{profile.lastName[0]}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats (independent) */}
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat__value">4+</span>
                            <span className="hero-stat__label">Years of Experience</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat__value">11+</span>
                            <span className="hero-stat__label">Projects Completed</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat__value">5+</span>
                            <span className="hero-stat__label">Team Members</span>
                        </div>
                    </div>

                    {/* Right: Image Slider */}
                    <div className="hero-slider">
                        <div className="hero-slider-inner">
                            <div className="hero-slider-viewport">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={displayIndex}
                                        className="hero-slide"
                                        style={{ backgroundImage: `url(${slides[displayIndex].bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="hero-slide-overlay" />
                                        <SlideText data={slides[displayIndex].data} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div
                                className={`hero-side-card ${hoveredCard === 4 ? 'active' : ''}`}
                                style={{ backgroundImage: 'url(https://picsum.photos/seed/heroside2/100/800)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                                onMouseEnter={() => sideCardEnter(4)}
                                onMouseLeave={sideCardLeave}
                            >
                                <span className="hero-side-card__label">About us</span>
                            </div>
                            <div
                                className={`hero-side-card ${hoveredCard === 5 ? 'active' : ''}`}
                                style={{ backgroundImage: 'url(https://picsum.photos/seed/heroside3/100/800)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                                onMouseEnter={() => sideCardEnter(5)}
                                onMouseLeave={sideCardLeave}
                            >
                                <span className="hero-side-card__label">About us</span>
                            </div>
                        </div>

                        <div className="hero-slider-nav">
                            <button className="hero-slider-arrow" onClick={handlePrev} aria-label="Previous">
                                <FaChevronLeft />
                            </button>
                            <div className="hero-slider-dots">
                                {slides.slice(0, 4).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`hero-slider-dot ${i === displayIndex ? 'active' : ''}`}
                                        onClick={() => { setCurrent(i); setHoveredCard(null); }}
                                    />
                                ))}
                            </div>
                            <button className="hero-slider-arrow" onClick={handleNext} aria-label="Next">
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
