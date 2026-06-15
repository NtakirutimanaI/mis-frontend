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
            { text: 'Networking', delay: 2.5, duration: 1.2 },
            { text: 'Cloud Solutions', delay: 4.5, duration: 1.4 },
            { text: 'IT Support', delay: 6.5, duration: 1.2 },
        ],
    },
    {
        color: '#ff5252',
        lines: [
            { text: 'DASHBOARDS', delay: 0.3, duration: 1.5 },
            { text: 'Analytics', delay: 2.5, duration: 1.2 },
            { text: 'KPI Reports', delay: 4.5, duration: 1.3 },
            { text: 'Data Viz', delay: 6.5, duration: 1.1 },
        ],
    },
    {
        color: '#4ecdc4',
        lines: [
            { text: 'INNOVATIONS', delay: 0.3, duration: 1.5 },
            { text: 'Artificial Intelligence', delay: 2.5, duration: 1.8 },
            { text: 'IoT Solutions', delay: 5.0, duration: 1.3 },
            { text: 'Smart Systems', delay: 7.0, duration: 1.3 },
        ],
    },
    {
        color: '#2d2d2d',
        lines: [
            { text: 'DIGITAL SOLUTIONS', delay: 0.3, duration: 1.7 },
            { text: 'Web Development', delay: 2.8, duration: 1.4 },
            { text: 'Mobile Apps', delay: 5.0, duration: 1.2 },
            { text: 'ERP Systems', delay: 7.0, duration: 1.1 },
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
            <svg viewBox="0 0 400 160" className="handwriting-svg">
                <defs>
                    <clipPath id={`reveal-${color.replace('#', '')}`}>
                        <rect x="0" y="0" width="400" height="160" />
                    </clipPath>
                </defs>
                {lines.map((line, i) => (
                    <g key={i}>
                        <text
                            x="90"
                            y={38 + i * 32}
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
                            x="90"
                            y={38 + i * 32}
                            className="hw-text-stroke"
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                            strokeDasharray="400"
                            strokeDashoffset={i < revealedCount ? 0 : 400}
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
                        transform: `translateX(${Math.min(revealedCount * 80, 280)}px)`,
                    }}
                >
                    <g className="hp-hand">
                        <path
                            d="M14,90 C10,84 12,76 16,70 C20,66 28,66 32,72
                               C34,76 34,82 36,86 C38,90 40,94 34,96
                               C26,98 18,96 14,90 Z"
                            fill="#eac8b0" stroke="#c9a686" strokeWidth="1"
                        />
                        <path
                            d="M18,70 C16,64 20,58 26,60 C32,62 34,68 32,72"
                            fill="#eac8b0" stroke="#c9a686" strokeWidth="1"
                        />
                        <path
                            d="M32,84 C30,90 34,96 40,94 C44,92 44,86 40,80"
                            fill="#e0b898" stroke="#c9a686" strokeWidth="1"
                        />
                        <path
                            d="M24,86 C22,94 28,100 34,98 C38,96 36,88 32,82"
                            fill="#d4ac8c" stroke="#c9a686" strokeWidth="1"
                        />
                        <path
                            d="M14,90 C12,86 14,82 18,80 C22,78 26,78 28,82"
                            fill="none" stroke="#c9a686" strokeWidth="0.6" opacity="0.5"
                        />
                    </g>
                    <g className="hp-pen">
                        <path
                            d="M32,86 L76,70 L80,78 L36,94 Z"
                            fill="#2d2d2d" stroke="#1a1a1a" strokeWidth="0.8"
                        />
                        <path
                            d="M76,70 L90,66 L80,78 Z"
                            fill={color}
                        />
                        <line x1="38" y1="87" x2="74" y2="73" stroke="#555" strokeWidth="1" opacity="0.3" />
                        <circle cx="36" cy="85" r="2" fill={color} opacity="0.5" />
                    </g>
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
        const timer = setInterval(next, 12000);
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
