import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { FaPlus, FaKey, FaLink, FaStickyNote, FaCalendarAlt, FaTrash, FaEdit, FaEye, FaEyeSlash, FaCopy, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { resourcesService, type Resource } from '../../services/resourcesService';
import Loading from '../../components/Loading';

const Resources = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    // Global Search from Layout
    const { searchQuery } = useOutletContext<{ searchQuery: string }>();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({
        type: 'credential',
        title: '',
        content: '',
        metadata: {}
    });

    // Password Visibility State (local map by ID)
    const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await resourcesService.getAll();
            setResources(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await resourcesService.update(editingId, formData);
            } else {
                await resourcesService.create(formData);
            }
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            alert('Failed to save');
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            await resourcesService.delete(id);
            setResources(prev => prev.filter(r => r.id !== id));
        } catch (e) {
            alert('Failed to delete');
        }
    };

    const openEdit = (res: Resource) => {
        setEditingId(res.id);
        setFormData({
            type: res.type,
            title: res.title,
            content: res.content,
            metadata: res.metadata || {}
        });
        setIsModalOpen(true);
    };

    const openNew = () => {
        setEditingId(null);
        setFormData({
            type: 'credential',
            title: '',
            content: '',
            metadata: {}
        });
        setIsModalOpen(true);
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const togglePassword = (id: string) => {
        setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Filter Logic
    const filtered = resources.filter(r => {
        const matchesType = filter === 'all' || r.type === filter;
        const query = (searchQuery || '').toLowerCase();
        const matchesSearch = r.title.toLowerCase().includes(query) ||
            r.content.toLowerCase().includes(query);
        return matchesType && matchesSearch;
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'credential': return <FaKey />;
            case 'link': return <FaLink />;
            case 'note': return <FaStickyNote />;
            case 'event': return <FaCalendarAlt />;
            default: return <FaStickyNote />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'credential': return 'var(--primary-yellow)';
            case 'link': return 'var(--primary-teal)';
            case 'event': return 'var(--primary-red)';
            default: return '#999';
        }
    };

    if (loading && resources.length === 0) return <Loading />;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Vault & Resources</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Securely manage credentials, links, and important notes.</p>
                </div>
                <button onClick={openNew} className="btn-primary">
                    <FaPlus /> Add New
                </button>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                {['all', 'credential', 'link', 'note', 'event'].map(t => (
                    <button
                        key={t}
                        onClick={() => setFilter(t)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                            whiteSpace: 'nowrap',
                            border: 'none',
                            background: filter === t ? 'var(--text-main)' : 'transparent',
                            color: filter === t ? 'var(--bg-body)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {t === 'all' ? 'All Items' : t + 's'}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <AnimatePresence>
                    {filtered.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="content-card"
                            style={{
                                position: 'relative',
                                padding: '0',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                borderTop: `4px solid ${getTypeColor(item.type)}`
                            }}
                        >
                            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '8px',
                                        background: 'var(--bg-body)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: getTypeColor(item.type), fontSize: '1.1rem'
                                    }}>
                                        {getTypeIcon(item.type)}
                                    </div>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <button onClick={() => openEdit(item)} className="admin-icon-btn" title="Edit"><FaEdit /></button>
                                        <button onClick={() => handleDelete(item.id)} className="admin-icon-btn" style={{ color: 'var(--primary-red)' }} title="Delete"><FaTrash /></button>
                                    </div>
                                </div>

                                <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem', wordBreak: 'break-all' }}>{item.title}</h3>

                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', flex: 1 }}>
                                    {/* Render based on Type */}
                                    {item.type === 'credential' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {item.metadata?.username && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-body)', padding: '0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>User:</span>
                                                    <span>{item.metadata.username}</span>
                                                    <button onClick={() => copyToClipboard(item.metadata.username, item.id + 'user')} style={{ marginLeft: 'auto', cursor: 'pointer', color: copiedId === item.id + 'user' ? 'var(--primary-teal)' : 'inherit' }}>
                                                        <FaCopy />
                                                    </button>
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-body)', padding: '0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                                                <span style={{ color: 'var(--text-muted)' }}>Pass:</span>
                                                <span>{visiblePasswords[item.id] ? item.content : '••••••••'}</span>
                                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                                                    <button onClick={() => togglePassword(item.id)} style={{ cursor: 'pointer' }}>{visiblePasswords[item.id] ? <FaEyeSlash /> : <FaEye />}</button>
                                                    <button onClick={() => copyToClipboard(item.content, item.id + 'pass')} style={{ cursor: 'pointer', color: copiedId === item.id + 'pass' ? 'var(--primary-teal)' : 'inherit' }}>
                                                        <FaCopy />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {item.type === 'link' && (
                                        <div>
                                            <a href={item.content} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-teal)', display: 'flex', alignItems: 'center', gap: '5px', wordBreak: 'break-all' }}>
                                                <FaExternalLinkAlt size={12} /> {item.content}
                                            </a>
                                            {item.metadata?.description && <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{item.metadata.description}</p>}
                                        </div>
                                    )}

                                    {item.type === 'note' && (
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{item.content}</p>
                                    )}

                                    {item.type === 'event' && (
                                        <div>
                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--bg-body)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                                <FaCalendarAlt /> {item.metadata?.date ? new Date(item.metadata.date).toLocaleDateString() : 'No Date'}
                                            </div>
                                            <p>{item.content}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filtered.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', border: '2px dashed var(--border-color)', borderRadius: '12px', color: 'var(--text-muted)' }}>
                        {searchQuery ? `No resources found matching "${searchQuery}"` : 'No resources found in this category.'}
                    </div>
                )}
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="content-card"
                            style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
                        >
                            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-white)' }}>
                                <h3 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{editingId ? 'Edit Item' : 'Add New Item'}</h3>
                                <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-muted)' }}><FaTimes /></button>
                            </div>

                            <form onSubmit={handleSave} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '80vh', overflowY: 'auto', background: 'var(--bg-body)' }}>
                                <div className="form-group">
                                    <label className="form-label">Type</label>
                                    <select
                                        className="form-select"
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="credential">Credential (User/Pass)</option>
                                        <option value="link">Link / Bookmark</option>
                                        <option value="note">Secure Note</option>
                                        <option value="event">Event / Date</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input
                                        className="form-input"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        placeholder="e.g. GitHub Login, Portfolio Design Link"
                                    />
                                </div>

                                {formData.type === 'credential' && (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">Username / Email</label>
                                            <input
                                                className="form-input"
                                                value={formData.metadata?.username || ''}
                                                onChange={e => setFormData({ ...formData, metadata: { ...formData.metadata, username: e.target.value } })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Password / Key</label>
                                            <input
                                                className="form-input"
                                                value={formData.content}
                                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                                type="text"
                                                placeholder="Secret value"
                                            />
                                        </div>
                                    </>
                                )}

                                {formData.type === 'link' && (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">URL</label>
                                            <input
                                                className="form-input"
                                                value={formData.content}
                                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Description (Optional)</label>
                                            <input
                                                className="form-input"
                                                value={formData.metadata?.description || ''}
                                                onChange={e => setFormData({ ...formData, metadata: { ...formData.metadata, description: e.target.value } })}
                                            />
                                        </div>
                                    </>
                                )}

                                {formData.type === 'note' && (
                                    <div className="form-group">
                                        <label className="form-label">Note Content</label>
                                        <textarea
                                            className="form-textarea"
                                            rows={5}
                                            value={formData.content}
                                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                                        />
                                    </div>
                                )}

                                {formData.type === 'event' && (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">Event Date</label>
                                            <input
                                                type="date"
                                                className="form-input"
                                                value={formData.metadata?.date || ''}
                                                onChange={e => setFormData({ ...formData, metadata: { ...formData.metadata, date: e.target.value } })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Details</label>
                                            <textarea
                                                className="form-textarea"
                                                value={formData.content}
                                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="admin-icon-btn" style={{ fontSize: '0.9rem', width: 'auto', padding: '0.5rem 1rem' }}>Cancel</button>
                                    <button type="submit" className="btn-primary">Save Item</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Resources;
