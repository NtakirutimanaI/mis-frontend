import { useState, useRef, useEffect } from 'react';
import { FaExternalLinkAlt, FaCertificate, FaTimes } from 'react-icons/fa';
import type { Profile } from '../services/profileService';

interface CertificationsProps {
    profile: Profile;
}

const Certifications: React.FC<CertificationsProps> = ({ profile }) => {
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const certs = profile.certifications || [];

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || el.scrollWidth <= el.clientWidth) return;

        let timer: ReturnType<typeof setInterval>;
        const scroll = () => {
            if (isPaused) return;
            const card = el.children[0] as HTMLElement | undefined;
            if (!card) return;
            const step = card.offsetWidth + 24;
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= maxScroll - 10) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: step, behavior: 'smooth' });
            }
        };
        timer = setInterval(scroll, 5000);
        return () => clearInterval(timer);
    }, [isPaused]);

    if (certs.length === 0) return null;

    return (
        <section className="section" id="certifications" style={{ background: 'var(--section-alt)' }}>
            <div className="container">
                <div style={{ marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Certifications</h1>
                </div>

                <div style={{ position: 'relative' }}>
                    <div ref={scrollRef}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        style={{
                            display: 'flex',
                            gap: '1.5rem',
                            overflow: 'hidden',
                            scrollBehavior: 'smooth',
                            paddingBottom: '4px',
                        }}>
                        {certs.map((cert, index) => (
                            <div key={index}
                                onClick={() => cert.imageUrl && setPreviewImg(cert.imageUrl)}
                                style={{
                                    background: 'var(--card-bg)',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'flex-start',
                                    flex: '0 0 min(350px, 80vw)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: cert.imageUrl ? 'pointer' : 'default',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                            >
                                {cert.imageUrl ? (
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        border: '1px solid var(--border-color)',
                                    }}>
                                        <img src={cert.imageUrl} alt={cert.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    </div>
                                ) : (
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '8px',
                                        background: 'var(--accent-gradient)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.3rem',
                                        color: '#fff',
                                        flexShrink: 0,
                                    }}>
                                        <FaCertificate />
                                    </div>
                                )}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{cert.name}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                                        {cert.issuer}
                                    </p>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        {cert.date ? new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                                    </span>
                                    {cert.credentialUrl && (
                                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.35rem',
                                                fontSize: '0.85rem',
                                                marginLeft: '1rem',
                                                color: 'var(--primary-teal)',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                            }}>
                                            Verify <FaExternalLinkAlt style={{ fontSize: '0.7rem' }} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {previewImg && (
                <div
                    onClick={() => setPreviewImg(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                    }}
                >
                    <button
                        onClick={() => setPreviewImg(null)}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            border: 'none',
                            background: 'rgba(255,255,255,0.2)',
                            color: '#fff',
                            fontSize: '1.3rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(4px)',
                        }}
                    >
                        <FaTimes />
                    </button>
                    <img
                        src={previewImg}
                        alt="Certificate"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '90vh',
                            borderRadius: '8px',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            )}
        </section>
    );
};

export default Certifications;
