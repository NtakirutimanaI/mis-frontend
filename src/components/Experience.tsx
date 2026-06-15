import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaCloud, FaDatabase, FaCogs, FaShieldAlt, FaChartLine, FaRobot, FaProjectDiagram, FaTimes, FaArrowRight } from 'react-icons/fa';
import type { Profile } from '../services/profileService';

const SERVICE_ICONS = [FaLaptopCode, FaMobileAlt, FaCloud, FaDatabase, FaCogs, FaShieldAlt, FaChartLine, FaRobot, FaProjectDiagram];

const SERVICE_IMAGES: Record<string, string> = {
    'Custom Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
    'Mobile App Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000',
    'Backend API & Cloud Infrastructure': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000',
    'UI/UX Design & Frontend Engineering': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000',
};

const SERVICE_DETAILS: Record<string, string> = {
    'Custom Web Development': 'We build end-to-end web applications using modern frameworks like NestJS, React, and TypeScript. From initial concept through deployment and maintenance, our full-stack team delivers scalable, secure, and performant solutions tailored to your business requirements. Our process includes requirements analysis, architecture design, iterative development, QA testing, and ongoing support.',
    'Mobile App Development': 'Our mobile team develops native and cross-platform applications using React Native and Flutter. We deliver seamless user experiences across iOS and Android devices with features like offline support, push notifications, and real-time sync. From MVP to enterprise-grade apps, we handle the full mobile development lifecycle.',
    'Backend API & Cloud Infrastructure': 'We design and build robust RESTful and GraphQL APIs powered by PostgreSQL, NestJS, and TypeScript. Our cloud infrastructure services include deployment on AWS, Vercel, and Docker, with CI/CD pipelines, monitoring, and auto-scaling. We ensure high availability, security, and performance for your systems.',
    'UI/UX Design & Frontend Engineering': 'Our frontend engineers create pixel-perfect, responsive interfaces using React, Vue.js, and Tailwind CSS. We focus on performance optimization, accessibility (a11y), and intuitive user experiences. From design systems to component libraries, we build frontends that users love.',
};

interface ExperienceProps {
    profile: Profile;
}

const Experience: React.FC<ExperienceProps> = ({ profile }) => {
    const [selectedService, setSelectedService] = useState<any>(null);

    return (
        <section className="section section-indicator" id="resume">
            <div className="container">
                <h2 className="ark-section__heading">About MIS</h2>

                {/* About Us */}
                <div className="ark-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                    <p className="ark-section__sub">About Us</p>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)', margin: 0 }}>
                        {profile.about || profile.bio || "MAKE IT SOLUTIONS (MIS) is a leading ICT company in Rwanda specializing in web development, mobile applications, and digital transformation."}
                    </p>
                </div>

                {/* Our Technologies */}
                <div style={{ marginBottom: '3rem' }}>
                    <p className="ark-section__sub">Our Technologies</p>
                    <div className="ark-grid-auto">
                        {Object.entries(profile.skills || {}).filter(([category]) =>
                            !['other'].includes(category)
                        ).map(([category, skills]) => (
                            <div key={category} className="ark-card" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'capitalize', color: 'var(--primary-teal)' }}>
                                    {category.replace(/-/g, ' ')}
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {(skills || []).map(skill => (
                                        <span key={skill} className="tech-pill">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {Object.keys(profile.skills || {}).length === 0 && (
                            <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>No skills added yet.</p>
                        )}
                    </div>
                </div>

                {/* Our Services */}
                {profile.education && profile.education.length > 0 && (
                    <div>
                        <p className="ark-section__sub">Our Services</p>
                        <div className="ark-grid-3">
                            {profile.education.map((edu, idx) => {
                                const IconComponent = SERVICE_ICONS[idx % SERVICE_ICONS.length];
                                return (
                                    <motion.div
                                        key={idx}
                                        onClick={() => setSelectedService(edu)}
                                        className="ark-card"
                                        style={{ padding: '2rem 1.5rem', cursor: 'pointer' }}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                    >
                                        <div style={{
                                            width: '56px', height: '56px', borderRadius: '14px',
                                            background: 'linear-gradient(135deg, var(--primary) 0%, #5fa832 100%)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontSize: '1.5rem', marginBottom: '1.25rem'
                                        }}>
                                            <IconComponent />
                                        </div>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                            {edu.degree}
                                        </h3>
                                        {edu.institution && (
                                            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                {edu.institution}
                                            </p>
                                        )}
                                        {edu.description && (
                                            <>
                                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
                                                    {edu.description}
                                                </p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                                                    Learn More <FaArrowRight size={11} />
                                                </div>
                                            </>
                                        )}
                                        {!edu.description && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, marginTop: '1rem' }}>
                                                Click for details <FaArrowRight size={11} />
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Service Detail Modal */}
                <AnimatePresence>
                    {selectedService && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedService(null)}
                            style={{
                                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
                                backdropFilter: 'blur(8px)', zIndex: 10000,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                onClick={e => e.stopPropagation()}
                                className="ark-card"
                                style={{
                                    maxWidth: '700px', width: '100%', maxHeight: '90vh',
                                    display: 'flex', flexDirection: 'column',
                                }}
                            >
                                <div style={{ width: '100%', height: '260px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                                    <img
                                        src={SERVICE_IMAGES[selectedService.degree] || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000'}
                                        alt={selectedService.degree}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <button
                                        onClick={() => setSelectedService(null)}
                                        style={{
                                            position: 'absolute', top: '1rem', right: '1rem', width: '36px', height: '36px',
                                            borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none',
                                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer', fontSize: '1rem',
                                        }}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <div style={{ padding: '2rem', overflowY: 'auto' }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '12px',
                                        background: 'linear-gradient(135deg, var(--primary) 0%, #5fa832 100%)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontSize: '1.3rem', marginBottom: '1rem',
                                    }}>
                                        {(() => {
                                            const IconComp = SERVICE_ICONS[profile.education.findIndex((e: any) => e.degree === selectedService.degree) % SERVICE_ICONS.length] || FaLaptopCode;
                                            return <IconComp />;
                                        })()}
                                    </div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        {selectedService.degree}
                                    </h2>
                                    {selectedService.institution && (
                                        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
                                            {selectedService.institution}
                                        </p>
                                    )}
                                    <div style={{ width: '60px', height: '3px', background: 'var(--primary)', borderRadius: '2px', marginBottom: '1.5rem' }} />
                                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                                        {SERVICE_DETAILS[selectedService.degree] || selectedService.description || 'Click "Contact" to discuss how we can help with your project.'}
                                    </p>
                                    <a
                                        href="/#contact"
                                        onClick={() => setSelectedService(null)}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '2rem',
                                            padding: '0.8rem 2rem', background: 'linear-gradient(135deg, var(--primary) 0%, #5fa832 100%)',
                                            color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Get in Touch <FaArrowRight size={13} />
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Experience;
