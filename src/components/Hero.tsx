import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Profile } from '../services/profileService';

interface HeroProps {
    profile: Profile;
}

const slides = [
    {
        title: 'Our ICT Services',
        description: 'Enterprise-grade IT solutions tailored to your business needs.',
        color: '#7BC043',
    },
    {
        title: 'Dashboards',
        description: 'Real-time analytics and monitoring dashboards for data-driven decisions.',
        color: '#ff5252',
    },
    {
        title: 'Our Innovations',
        description: 'Cutting-edge technology innovations driving digital transformation.',
        color: '#4ecdc4',
    },
    {
        title: 'Digital Solutions',
        description: 'End-to-end digital solutions from concept to deployment.',
        color: '#2d2d2d',
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
        const timer = setInterval(next, 5000);
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
                                    style={{ background: slides[current].color }}
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -60 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="hero-slide-content">
                                        <h3 className="hero-slide-title">{slides[current].title}</h3>
                                        <p className="hero-slide-desc">{slides[current].description}</p>
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
