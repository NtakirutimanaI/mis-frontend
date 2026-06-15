import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Profile } from '../services/profileService';

interface TeamMembersProps {
    profile: Profile;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ profile }) => {
    const members = profile.teamMembers || [];
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (members.length === 0) return;
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % members.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [members.length]);

    if (members.length === 0) return null;

    const getImageUrl = (member: any) => {
        if (member.imageUrl) return member.imageUrl;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=300`;
    };

    const handleNext = () => {
        setActive((prev) => (prev + 1) % members.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + members.length) % members.length);
    };

    return (
        <section className="section" id="team">
            <div className="container">
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Our Team</h1>
                </div>
                <div style={{
                    background: 'var(--card-bg)',
                    borderRadius: '16px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5rem', width: '100%' }}>
                        <div
                            onClick={handleNext}
                            style={{
                                position: 'relative',
                                width: '270px',
                                height: '300px',
                                flexShrink: 0,
                                cursor: 'pointer',
                            }}
                        >
                            {members.map((member, idx) => {
                                const isActive = idx === active;
                                const isPrev = idx === (active - 1 + members.length) % members.length;
                                const isNext = idx === (active + 1) % members.length;

                                let offsetX = 0;
                                let offsetY = 0;
                                let rotate = 0;

                                if (isPrev) {
                                    offsetX = -28;
                                    offsetY = 20;
                                    rotate = -15;
                                } else if (isNext) {
                                    offsetX = 28;
                                    offsetY = 20;
                                    rotate = 15;
                                } else if (!isActive) {
                                    offsetX = (idx % 2 === 0 ? -1 : 1) * 22;
                                    offsetY = 16;
                                    rotate = (idx % 2 === 0 ? -12 : 12);
                                }

                                return (
                                    <motion.div
                                        key={member.name}
                                        layout
                                        initial={false}
                                        animate={{
                                            zIndex: isActive ? 10 : (isPrev || isNext ? 5 : 1),
                                            x: isActive ? 0 : offsetX,
                                            y: isActive ? [-25, 12, -5, 0] : offsetY,
                                            rotate: isActive ? 0 : rotate,
                                            scale: isActive ? 1 : 0.95,
                                        }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: isActive
                                                ? '0 12px 40px rgba(0,0,0,0.25)'
                                                : '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <img
                                            src={getImageUrl(member)}
                                            alt={member.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div style={{ paddingLeft: '50px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{members[active].name}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>{members[active].role}</p>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                                <button onClick={handlePrev} style={{ background: 'none', color: '#22c55e', border: 'none', padding: '4px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
                                    <FaChevronLeft />
                                </button>
                                <button onClick={handleNext} style={{ background: 'none', color: '#22c55e', border: 'none', padding: '4px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', transform: 'translateX(-95px)' }}>
                        {members.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActive(idx)}
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: idx === active ? 'var(--primary)' : 'var(--border-color)',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'background 0.3s',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamMembers;
