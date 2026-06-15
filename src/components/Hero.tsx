import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Profile } from '../services/profileService';

interface HeroProps {
    profile: Profile;
}

interface WordItem {
    text: string;
    dir: 'left' | 'right' | 'top' | 'bottom';
    delay: number;
    x?: number;
    y?: number;
}

interface SlideData {
    color: string;
    words: WordItem[];
}

const slideData: SlideData[] = [
    {
        color: '#7BC043',
        words: [
            { text: 'ICT SERVICES', dir: 'left', delay: 0.2, x: -30 },
            { text: 'Networking', dir: 'top', delay: 1.5, y: -40 },
            { text: 'Cloud Solutions', dir: 'right', delay: 2.8, x: 30 },
            { text: 'IT Support', dir: 'bottom', delay: 4.0, y: 40 },
            { text: 'Software Dev', dir: 'left', delay: 5.2, x: -40 },
            { text: 'Cybersecurity', dir: 'top', delay: 6.5, y: -35 },
            { text: 'Cloud Infra', dir: 'right', delay: 7.8, x: 35 },
            { text: 'Consulting', dir: 'bottom', delay: 9.0, y: 30 },
        ],
    },
    {
        color: '#ff5252',
        words: [
            { text: 'DASHBOARDS', dir: 'left', delay: 0.2, x: -30 },
            { text: 'Analytics', dir: 'top', delay: 1.5, y: -40 },
            { text: 'KPI Reports', dir: 'right', delay: 2.8, x: 30 },
            { text: 'Data Viz', dir: 'bottom', delay: 4.0, y: 40 },
            { text: 'Business Intel', dir: 'left', delay: 5.2, x: -40 },
            { text: 'Real-time', dir: 'top', delay: 6.5, y: -35 },
            { text: 'Monitoring', dir: 'right', delay: 7.8, x: 35 },
            { text: 'Forecasts', dir: 'bottom', delay: 9.0, y: 30 },
        ],
    },
    {
        color: '#4ecdc4',
        words: [
            { text: 'INNOVATIONS', dir: 'left', delay: 0.2, x: -30 },
            { text: 'AI', dir: 'top', delay: 1.5, y: -40 },
            { text: 'IoT', dir: 'right', delay: 2.8, x: 30 },
            { text: 'Smart Systems', dir: 'bottom', delay: 4.0, y: 40 },
            { text: 'Automation', dir: 'left', delay: 5.2, x: -40 },
            { text: 'Blockchain', dir: 'top', delay: 6.5, y: -35 },
            { text: 'Robotics', dir: 'right', delay: 7.8, x: 35 },
            { text: '5G Solutions', dir: 'bottom', delay: 9.0, y: 30 },
        ],
    },
    {
        color: '#2d2d2d',
        words: [
            { text: 'DIGITAL SOLUTIONS', dir: 'left', delay: 0.2, x: -30 },
            { text: 'Web Dev', dir: 'top', delay: 1.5, y: -40 },
            { text: 'Mobile Apps', dir: 'right', delay: 2.8, x: 30 },
            { text: 'ERP Systems', dir: 'bottom', delay: 4.0, y: 40 },
            { text: 'Trainings', dir: 'left', delay: 5.2, x: -40 },
            { text: 'Internships', dir: 'top', delay: 6.5, y: -35 },
            { text: 'Digital Transform', dir: 'right', delay: 7.8, x: 35 },
            { text: 'Cloud Migration', dir: 'bottom', delay: 9.0, y: 30 },
        ],
    },
];

const entryVariants = {
    left: { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 80 }, animate: { opacity: 1, x: 0 } },
    top: { initial: { opacity: 0, y: -60 }, animate: { opacity: 1, y: 0 } },
    bottom: { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } },
};

const AnimatedWords: React.FC<{ words: WordItem[]; color: string }> = ({ words, color }) => {
    const [visible, setVisible] = useState<number[]>([]);

    useEffect(() => {
        setVisible([]);
        const timers: number[] = [];
        words.forEach((_, i) => {
            const t = window.setTimeout(() => {
                setVisible((prev) => [...prev, i]);
            }, words[i].delay * 1000);
            timers.push(t);
        });
        return () => timers.forEach(clearTimeout);
    }, [words]);

    return (
        <div className="hw-board">
            {words.map((w, i) => {
                const v = entryVariants[w.dir];
                return (
                    <motion.span
                        key={i}
                        className={`hw-word hw-dir-${w.dir}`}
                        style={{ color, '--hw-color': color } as React.CSSProperties}
                        initial={v.initial}
                        animate={visible.includes(i) ? v.animate : v.initial}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        {w.text}
                    </motion.span>
                );
            })}
            <motion.div
                className="hw-pen-icon"
                style={{ color }}
                animate={{
                    x: [0, 6, -2, 4, 0],
                    y: [0, -4, 2, -2, 0],
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
                ✏️
            </motion.div>
        </div>
    );
};

const slides = [
    { data: slideData[0] },
    { data: slideData[1] },
    { data: slideData[2] },
    { data: slideData[3] },
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
        const timer = setInterval(next, 14000);
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
                                    <AnimatedWords words={slides[current].data.words} color={slides[current].data.color} />
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
