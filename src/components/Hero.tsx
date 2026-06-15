import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Profile } from '../services/profileService';

interface HeroProps {
    profile: Profile;
}

interface WritingLine {
    text: string;
    delay: number;
    duration: number;
}
interface SlideData {
    lines: WritingLine[];
    color: string;
}

const writingLines: SlideData[] = [
    {
        color: '#7BC043',
        lines: [
            { text: 'ICT SERVICES', delay: 0.3, duration: 1.5 },
            { text: 'Networking', delay: 2.0, duration: 1.2 },
            { text: 'Cloud Solutions', delay: 3.5, duration: 1.4 },
            { text: 'IT Support', delay: 5.0, duration: 1.2 },
            { text: 'Software Dev', delay: 6.5, duration: 1.3 },
            { text: 'Cybersecurity', delay: 8.0, duration: 1.4 },
            { text: 'Cloud Infra', delay: 9.5, duration: 1.2 },
        ],
    },
    {
        color: '#ff5252',
        lines: [
            { text: 'DASHBOARDS', delay: 0.3, duration: 1.5 },
            { text: 'Analytics', delay: 2.0, duration: 1.2 },
            { text: 'KPI Reports', delay: 3.5, duration: 1.3 },
            { text: 'Data Viz', delay: 5.0, duration: 1.1 },
            { text: 'Business Intel', delay: 6.5, duration: 1.4 },
            { text: 'Real-time', delay: 8.0, duration: 1.2 },
            { text: 'Monitoring', delay: 9.5, duration: 1.3 },
        ],
    },
    {
        color: '#4ecdc4',
        lines: [
            { text: 'INNOVATIONS', delay: 0.3, duration: 1.5 },
            { text: 'Artificial Intelligence', delay: 2.0, duration: 1.8 },
            { text: 'IoT Solutions', delay: 4.0, duration: 1.3 },
            { text: 'Smart Systems', delay: 5.5, duration: 1.3 },
            { text: 'Automation', delay: 7.0, duration: 1.2 },
            { text: 'Blockchain', delay: 8.5, duration: 1.3 },
            { text: 'Robotics', delay: 10.0, duration: 1.2 },
        ],
    },
    {
        color: '#2d2d2d',
        lines: [
            { text: 'DIGITAL SOLUTIONS', delay: 0.3, duration: 1.7 },
            { text: 'Web Development', delay: 2.3, duration: 1.4 },
            { text: 'Mobile Apps', delay: 4.0, duration: 1.2 },
            { text: 'ERP Systems', delay: 5.5, duration: 1.1 },
            { text: 'Trainings', delay: 7.0, duration: 1.3 },
            { text: 'Internships', delay: 8.5, duration: 1.3 },
            { text: 'Digital Transform', delay: 10.0, duration: 1.4 },
        ],
    },
];

const HandWriting: React.FC<{ lines: WritingLine[]; color: string }> = ({ lines, color }) => {
    const [revealedCount, setRevealedCount] = useState(0);

    useEffect(() => {
        setRevealedCount(0);
        const timers: number[] = [];
        lines.forEach((line) => {
            const t = window.setTimeout(() => {
                setRevealedCount((prev) => prev + 1);
            }, line.delay * 1000);
            timers.push(t);
        });
        return () => timers.forEach(clearTimeout);
    }, [lines]);

    return (
        <div className="handwriting-wrap">
            <svg viewBox="0 0 500 260" className="handwriting-svg">
                <defs>
                    <clipPath id={`reveal-${color.replace('#', '')}`}>
                        <rect x="0" y="0" width="500" height="260" />
                    </clipPath>
                </defs>
                {lines.map((line, i) => (
                    <g key={i}>
                        <text
                            x="30"
                            y={34 + i * 28}
                            className="hw-text"
                            fill={color}
                            opacity={i < revealedCount ? 1 : 0}
                            style={{
                                transition: `opacity 0.3s ease ${(line.duration - 0.3).toFixed(1)}s`,
                            }}
                        >
                            {line.text}
                        </text>
                        <text
                            x="30"
                            y={34 + i * 28}
                            className="hw-text-stroke"
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                            strokeDasharray="600"
                            strokeDashoffset={i < revealedCount ? 0 : 600}
                            style={{
                                transition: `stroke-dashoffset ${line.duration}s ease ${line.delay}s`,
                            }}
                        >
                            {line.text}
                        </text>
                    </g>
                ))}
                <g
                    className="hand-pen"
                    style={{
                        transition: 'transform 1s ease',
                        transform: `translateX(${Math.min(revealedCount * 65, 390)}px)`,
                    }}
                >
                    <path
                        d="M28 80 Q30 76 34 74 L38 72 Q40 74 38 78 L34 82 Q30 84 28 80Z"
                        fill={color}
                        opacity="0.9"
                    />
                    <line x1="38" y1="74" x2="56" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="32" cy="76" r="8" fill={color} opacity="0.15" />
                    <path
                        d="M22 78 Q20 72 24 68 Q28 64 32 66"
                        stroke={color}
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.7"
                    />
                    <line x1="56" y1="70" x2="62" y2="68" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                </g>
            </svg>
        </div>
    );
};

const slides = [
    { data: writingLines[0] },
    { data: writingLines[1] },
    { data: writingLines[2] },
    { data: writingLines[3] },
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
        const timer = setInterval(next, 15000);
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
                                    <HandWriting lines={slides[current].data.lines} color={slides[current].data.color} />
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
