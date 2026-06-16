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
            <motion.img
                src="/logo.png"
                alt="Logo"
                style={{
                    width: '120px',
                    height: 'auto',
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    );
};

export default Loading;
