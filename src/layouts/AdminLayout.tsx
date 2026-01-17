import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    FaChartBar, FaUser, FaEnvelope, FaSignOutAlt, FaCog, FaBook,
    FaSearch, FaPlus, FaBell, FaDatabase, FaMoon, FaSun,
    FaCheck, FaTrash, FaTimes, FaProjectDiagram, FaBars
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { notificationService, type Notification } from '../services/notificationService';
import { AnimatePresence, motion } from 'framer-motion';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    // Header State with Persistence
    const [searchQuery, setSearchQuery] = useState('');
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage on initial load
        const savedTheme = localStorage.getItem('adminTheme');
        return savedTheme === 'dark';
    });

    // Notification State
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    const addMenuRef = useRef<HTMLDivElement>(null);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    // Save to localStorage whenever isDark changes
    useEffect(() => {
        localStorage.setItem('adminTheme', isDark ? 'dark' : 'light');
    }, [isDark]);

    // Fetch Notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await notificationService.getAll();
                setNotifications(data);
                setUnreadCount(data.filter(n => !n.isRead).length);
            } catch (error) {
                console.error("Failed to load notifications", error);
            }
        };
        fetchNotifications();

        // Poll every minute
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
                setShowAddMenu(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle Notifications
    const toggleNotifications = () => setShowNotifications(!showNotifications);

    const markAsRead = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await notificationService.markAsRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (e) { console.error(e); }
    };

    const deleteNotification = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await notificationService.delete(id);
            const isUnread = notifications.find(n => n.id === id)?.isRead === false;
            setNotifications(prev => prev.filter(n => n.id !== id));
            if (isUnread) setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (e) { console.error(e); }
    };

    const navItems = [
        { path: '/admin', icon: <FaChartBar />, label: 'Overview' },
        { path: '/admin/profile', icon: <FaUser />, label: 'Profile' },
        { path: '/admin/resources', icon: <FaDatabase />, label: 'Resources' },
        { path: '/admin/api-docs', icon: <FaBook />, label: 'API Docs' },
        { path: '/admin/messages', icon: <FaEnvelope />, label: 'Messages' },
        { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchQuery(val);
        console.log("Searching for:", val);
    };

    return (
        // Apply 'dark-mode' class to the main container
        <div className={`admin-layout ${isDark ? 'dark-mode' : ''}`}>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="sidebar-overlay active"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Header - Fixed Top */}
            <header className="admin-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <FaBars />
                    </button>
                    {/* Brand Logo */}
                    <Link to="/" className="admin-brand">
                        <span style={{ width: '12px', height: '12px', background: 'var(--primary-yellow)', borderRadius: '50%', display: 'inline-block' }}></span>
                        Admin Panel
                    </Link>

                    {/* Search Bar */}
                    <div className="admin-search-container">
                        <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            className="admin-search-input"
                            placeholder="Search everything..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="admin-header-actions">
                    <div style={{ position: 'relative' }} ref={addMenuRef}>
                        <button
                            title="Create New"
                            onClick={() => setShowAddMenu(!showAddMenu)}
                            style={{ width: '35px', height: '35px', background: 'var(--primary-yellow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', cursor: 'pointer', border: 'none' }}
                        >
                            <FaPlus size={12} />
                        </button>

                        <AnimatePresence>
                            {showAddMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    style={{
                                        position: 'absolute',
                                        right: '50%',
                                        transform: 'translateX(50%)',
                                        top: '120%',
                                        width: '200px',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                        zIndex: 1000,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden',
                                        padding: '5px'
                                    }}
                                >
                                    <div style={{ padding: '8px 12px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                                        Quick Add
                                    </div>
                                    <Link to="/admin/profile" onClick={() => setShowAddMenu(false)} className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>
                                        <div style={{ width: '24px', height: '24px', background: '#dcfce7', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}><FaProjectDiagram size={12} /></div>
                                        New Project
                                    </Link>
                                    <Link to="/admin/profile" onClick={() => setShowAddMenu(false)} className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>
                                        <div style={{ width: '24px', height: '24px', background: '#f3e8ff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}><FaBook size={12} /></div>
                                        New Skill
                                    </Link>
                                    <Link to="/admin/resources" onClick={() => setShowAddMenu(false)} className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>
                                        <div style={{ width: '24px', height: '24px', background: '#ffedd5', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}><FaDatabase size={12} /></div>
                                        Add Resource
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button className="admin-icon-btn" onClick={() => setIsDark(!isDark)} title="Toggle Theme">
                        {isDark ? <FaSun /> : <FaMoon />}
                    </button>

                    <Link to="/admin/messages" className="admin-icon-btn" title="Messages">
                        <FaEnvelope />
                    </Link>

                    <div style={{ position: 'relative' }} ref={notifRef}>
                        <button className="admin-icon-btn" title="Notifications" onClick={toggleNotifications}>
                            <FaBell />
                            {unreadCount > 0 && <span className="admin-badge">{unreadCount}</span>}
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '120%',
                                        width: '320px',
                                        maxHeight: '400px',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                        zIndex: 1000,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ padding: '10px 15px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-body)' }}>
                                        <h4 style={{ fontWeight: 800, fontSize: '0.9rem' }}>Notifications</h4>
                                        <button onClick={() => setShowNotifications(false)} style={{ color: 'var(--text-muted)' }}><FaTimes /></button>
                                    </div>

                                    <div style={{ overflowY: 'auto', flex: 1 }}>
                                        {notifications.length === 0 ? (
                                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                No notifications
                                            </div>
                                        ) : (
                                            notifications.map(n => (
                                                <div
                                                    key={n.id}
                                                    style={{
                                                        padding: '12px 15px',
                                                        borderBottom: '1px solid var(--border-color)',
                                                        background: n.isRead ? 'transparent' : 'rgba(var(--primary-teal-rgb, 100, 255, 218), 0.05)',
                                                        position: 'relative'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                        <span style={{ fontWeight: n.isRead ? 600 : 800, fontSize: '0.9rem', color: n.isRead ? 'var(--text-muted)' : 'var(--text-main)' }}>{n.title}</span>
                                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                                            {new Date(n.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: '1.4' }}>{n.message}</p>

                                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                        {!n.isRead && (
                                                            <button
                                                                onClick={(e) => markAsRead(n.id, e)}
                                                                title="Mark as Read"
                                                                style={{ fontSize: '0.8rem', color: 'var(--primary-teal)', background: 'transparent', padding: '2px' }}
                                                            >
                                                                <FaCheck />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={(e) => deleteNotification(n.id, e)}
                                                            title="Delete"
                                                            style={{ fontSize: '0.8rem', color: 'var(--primary-red)', background: 'transparent', padding: '2px' }}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={{ width: '1px', height: '25px', background: 'var(--border-color)' }}></div>

                    <div style={{ position: 'relative' }} ref={profileMenuRef}>
                        <div
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                        >
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user?.firstName || 'Admin'}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Administrator</div>
                            </div>

                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" className="admin-avatar" style={{ objectFit: 'cover' }} />
                            ) : (
                                <div className="admin-avatar">
                                    {user?.firstName?.[0] || 'A'}{user?.lastName?.[0] || 'D'}
                                </div>
                            )}
                        </div>

                        <AnimatePresence>
                            {showProfileMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '120%',
                                        width: '180px',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                        zIndex: 1000,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden',
                                        padding: '5px'
                                    }}
                                >
                                    <Link
                                        to="/admin/profile"
                                        onClick={() => setShowProfileMenu(false)}
                                        className="dropdown-item"
                                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}
                                    >
                                        <FaUser /> Edit Profile
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="dropdown-item"
                                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: 'var(--primary-red)', background: 'transparent', border: 'none', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                                    >
                                        <FaSignOutAlt /> Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
                <nav className="admin-nav">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ padding: '1rem', borderTop: '1px solid #333' }}>
                    <button
                        onClick={logout}
                        style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}
                    >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Content Wrapper */}
            <div className="admin-content">
                <main className="admin-main">
                    <Outlet context={{ searchQuery }} />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
