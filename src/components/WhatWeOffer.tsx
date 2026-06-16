import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaCloud, FaPaintBrush, FaHeadset, FaRocket, FaChartLine, FaShieldAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const offerings = [
    {
        icon: FaLaptopCode,
        title: 'Web Development',
        description: 'Custom websites and web applications built with modern frameworks like React, NestJS, and TypeScript — responsive, scalable, and performance-optimized.',
        color: '#7BC043',
        tags: ['Booking & Reservation', 'Ecommerce', 'Portfolio', 'Education', 'Job Portals', 'Real Estate', "NGO's", 'Blog'],
    },
    {
        icon: FaMobileAlt,
        title: 'Mobile Applications',
        description: 'Native and cross-platform mobile apps for iOS and Android using React Native, delivering seamless user experiences with offline support and real-time sync.',
        color: '#4ecdc4',
        tags: ['Booking & Reservation', 'Ecommerce', 'Portfolio', 'Education', 'Job Portals', 'Real Estate', "NGO's", 'Blog'],
    },
    {
        icon: FaCloud,
        title: 'Cloud Infrastructure',
        description: 'Cloud deployment, CI/CD pipelines, and infrastructure management on AWS, Vercel, and Docker — ensuring high availability, security, and auto-scaling.',
        color: '#ff5252',
        tags: ['Booking & Reservation', 'Ecommerce', 'Portfolio', 'Education', 'Job Portals', 'Real Estate', "NGO's", 'Blog'],
    },
    {
        icon: FaPaintBrush,
        title: 'UI/UX Design',
        description: 'Pixel-perfect, accessible interfaces and intuitive user experiences using Figma, Tailwind CSS, and Framer Motion — from wireframes to polished prototypes.',
        color: '#ff9f43',
        tags: ['Booking & Reservation', 'Ecommerce', 'Portfolio', 'Education', 'Job Portals', 'Real Estate', "NGO's", 'Blog'],
    },
    {
        icon: FaChartLine,
        title: 'Data Analytics',
        description: 'Interactive dashboards, KPI reports, and data visualization solutions that turn raw data into actionable business intelligence.',
        color: '#a29bfe',
        tags: ['Booking & Reservation', 'Ecommerce', 'Portfolio', 'Education', 'Job Portals', 'Real Estate', "NGO's", 'Blog'],
    },
    {
        icon: FaShieldAlt,
        title: 'Cybersecurity',
        description: 'Security audits, penetration testing, and implementation of best practices to protect your digital assets and ensure compliance with industry standards.',
        color: '#fd79a8',
        tags: ['Booking & Reservation', 'Ecommerce', 'Portfolio', 'Education', 'Job Portals', 'Real Estate', "NGO's", 'Blog'],
    },
    {
        icon: FaRocket,
        title: 'Digital Transformation',
        description: 'End-to-end digital strategy, ERP systems, and process automation to modernize your business operations and drive growth.',
        color: '#fdcb6e',
        tags: ['Booking & Reservation', 'Ecommerce', 'Portfolio', 'Education', 'Job Portals', 'Real Estate', "NGO's", 'Blog'],
    },
    {
        icon: FaHeadset,
        title: 'IT Support & Consulting',
        description: 'Reliable IT support, network setup, and technology consulting to keep your infrastructure running smoothly and securely.',
        color: '#74b9ff',
        tags: ['Booking & Reservation', 'Ecommerce', 'Portfolio', 'Education', 'Job Portals', 'Real Estate', "NGO's", 'Blog'],
    },
];

const slides = [
    'https://picsum.photos/seed/web1/600/400',
    'https://picsum.photos/seed/web2/600/400',
    'https://picsum.photos/seed/web3/600/400',
    'https://picsum.photos/seed/web4/600/400',
];

const ImageSlider = ({ color, seed }: { color: string; seed: number }) => {
    const [current, setCurrent] = useState(0);

    const prev = useCallback(() => {
        setCurrent(c => (c === 0 ? slides.length - 1 : c - 1));
    }, []);

    const next = useCallback(() => {
        setCurrent(c => (c === slides.length - 1 ? 0 : c + 1));
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <div className="offer-card__slider">
            {slides.map((base, i) => (
                <div
                    key={i}
                    className="offer-card__slide"
                    style={{
                        backgroundImage: `url(${base}?random=${seed + i})`,
                        opacity: i === current ? 1 : 0,
                        zIndex: i === current ? 1 : 0,
                    }}
                />
            ))}
            <button className="offer-card__slider-btn offer-card__slider-btn--left" onClick={prev} style={{ color }}>
                <FaChevronLeft />
            </button>
            <button className="offer-card__slider-btn offer-card__slider-btn--right" onClick={next} style={{ color }}>
                <FaChevronRight />
            </button>
            <div className="offer-card__slider-dots">
                {slides.map((_, i) => (
                    <span
                        key={i}
                        className={`offer-card__slider-dot ${i === current ? 'active' : ''}`}
                        style={i === current ? { background: color } : undefined}
                        onClick={() => setCurrent(i)}
                    />
                ))}
            </div>
        </div>
    );
};

const WhatWeOffer = () => {
    return (
        <section className="section section-indicator section-offer-dark" id="offerings">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.span
                        className="ark-section__sub"
                        style={{ display: 'inline-block' }}
                        animate={{ x: [-200, 200, -200] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        What We Offer
                    </motion.span>
                    <motion.h2
                        className="ark-section__heading"
                        style={{ textAlign: 'center' }}
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                    >
                        Our Core Services
                    </motion.h2>
                    <motion.p
                        style={{
                            maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)',
                            fontSize: '1.05rem', lineHeight: '1.7'
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    >
                        We deliver end-to-end digital solutions tailored to your business needs —
                        from strategy and design to development and ongoing support.
                    </motion.p>
                </div>

                <div className="offer-list">
                    {offerings.map((item, index) => {
                        return (
                            <motion.div
                                key={item.title}
                                className={`offer-card offer-card--wide ${index >= 4 ? 'offer-card--centered' : ''} ${index === 1 || index === 2 || index === 5 || index === 6 ? 'offer-card--reverse' : ''}`}
                                initial={{ opacity: 0, scale: 0.7, y: 40 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ margin: '-80px' }}
                                transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
                                whileHover={{ y: -5, scale: 1.01 }}
                            >
                                <div className="offer-card__split">
                                    <div className="offer-card__image">
                                        <ImageSlider color={item.color} seed={index * 10} />
                                    </div>
                                    <div className="offer-card__content">
                                        <h3 className="offer-card__title">{item.title}</h3>
                                        <p className="offer-card__desc">{item.description}</p>
                                        <a href="#contact" className="offer-card__learn-more">Learn More →</a>
                                        <div className="offer-card__tags">
                                            {item.tags.map(tag => (
                                                <span key={tag} className={`offer-card__tag ${tag === 'Job Portals' ? 'offer-card__tag--jp' : ''}`}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
