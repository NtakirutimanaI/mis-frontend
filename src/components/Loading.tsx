import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-body)',
            zIndex: 9999
        }}>
            <div style={{ textAlign: 'center' }}>
                <motion.div
                    style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 1.5rem',
                        borderRadius: '50%',
                        border: '5px solid var(--border-color)',
                        borderTopColor: 'var(--primary-yellow)'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <motion.h2
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, var(--primary-red), var(--primary-yellow))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '0.5rem'
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading...
                </motion.h2>
                <p style={{ color: 'var(--text-muted)' }}>Please wait while we fetch the data...</p>
            </div>
        </div>
    );
};

export default Loading;
