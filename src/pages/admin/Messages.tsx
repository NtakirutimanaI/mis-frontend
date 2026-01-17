import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaUser, FaRobot, FaCalendarAlt, FaTrash, FaMapMarkerAlt, FaEnvelope, FaDesktop, FaArrowLeft } from 'react-icons/fa';
import { chatService, type ChatConversation } from '../../services/chatService';
import Loading from '../../components/Loading';
import { useToast } from '../../context/ToastContext';

const Messages = () => {
    const { searchQuery } = useOutletContext<{ searchQuery: string }>();
    const { showToast } = useToast();
    const [conversations, setConversations] = useState<ChatConversation[]>([]);
    const [selectedConv, setSelectedConv] = useState<ChatConversation | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadConversations();
    }, []);

    const loadConversations = async () => {
        try {
            const data = await chatService.getAllConversations();
            setConversations(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // prevent selecting the conversation when clicking delete
        if (!confirm('Are you sure you want to delete this conversation? This cannot be undone.')) return;

        try {
            await chatService.deleteConversation(id);
            setConversations(prev => prev.filter(c => c.id !== id));
            showToast('Conversation deleted successfully', 'success');
            if (selectedConv?.id === id) {
                setSelectedConv(null);
            }
        } catch (error) {
            console.error('Failed to delete', error);
            showToast('Failed to delete conversation', 'error');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const filteredConversations = conversations.filter(c => {
        const query = (searchQuery || '').toLowerCase();
        return c.sessionId.toLowerCase().includes(query) ||
            c.messages.some(m => m.content.toLowerCase().includes(query)) ||
            (c.email && c.email.toLowerCase().includes(query)) ||
            (c.location && c.location.toLowerCase().includes(query));
    });

    return (
        <div className={`messages-layout ${selectedConv ? 'view-active' : ''}`} style={{ height: 'calc(100vh - 150px)' }}>
            {/* Sidebar List */}
            <div className="content-card messages-sidebar" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-white)' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.2rem' }}>Conversations</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Found {filteredConversations.length} sessions</p>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem', background: 'var(--bg-body)' }}>
                    {filteredConversations.map(conv => {
                        const lastMsg = conv.messages[conv.messages.length - 1];
                        return (
                            <div
                                key={conv.id}
                                className="group"
                                style={{ position: 'relative' }}
                            >
                                <button
                                    onClick={() => setSelectedConv(conv)}
                                    style={{
                                        width: '100%', padding: '1rem', borderRadius: '8px', textAlign: 'left',
                                        display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '0.5rem',
                                        border: selectedConv?.id === conv.id ? '1px solid var(--primary-yellow)' : '1px solid transparent',
                                        background: selectedConv?.id === conv.id ? 'rgba(248, 180, 0, 0.1)' : 'var(--bg-white)',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--primary-teal)' }}>ID: {conv.sessionId.slice(0, 8)}...</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{formatDate(conv.updatedAt)}</span>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '20px' }}>
                                        {lastMsg ? (
                                            <span style={{ color: lastMsg.sender === 'user' ? 'var(--text-main)' : 'var(--text-muted)', fontStyle: lastMsg.sender === 'user' ? 'normal' : 'italic' }}>
                                                {lastMsg.sender === 'user' ? '👤 ' : '🤖 '}{lastMsg.content}
                                            </span>
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)' }}>No messages</span>
                                        )}
                                    </div>
                                </button>

                                <button
                                    onClick={(e) => handleDelete(e, conv.id)}
                                    className="delete-btn"
                                    style={{
                                        position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                                        background: 'var(--bg-white)', color: 'var(--primary-red)', border: '1px solid var(--border-color)',
                                        borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', zIndex: 10, opacity: 0, transition: 'opacity 0.2s'
                                    }}
                                    title="Delete Conversation"
                                >
                                    <FaTrash size={12} />
                                </button>
                                <style>{`
                                    .group:hover .delete-btn { opacity: 1; }
                                `}</style>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Chat View */}
            <div className="content-card messages-content" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', position: 'relative' }}>
                {selectedConv ? (
                    <>
                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-white)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                    <button className="mobile-back-btn" onClick={() => setSelectedConv(null)}>
                                        <FaArrowLeft />
                                    </button>
                                    <h3 style={{ fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>Session: {selectedConv.sessionId}</h3>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FaCalendarAlt /> Started: {formatDate(selectedConv.createdAt)}
                                    </p>
                                    {selectedConv.email && (
                                        <p style={{ fontSize: '0.8rem', color: 'var(--primary-teal)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <FaEnvelope /> {selectedConv.email}
                                        </p>
                                    )}
                                    {selectedConv.location && (
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <FaMapMarkerAlt /> {selectedConv.location}
                                        </p>
                                    )}
                                    {selectedConv.device && (
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <FaDesktop /> {selectedConv.device}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={(e) => handleDelete(e, selectedConv.id)}
                                className="btn-primary"
                                style={{ background: 'transparent', border: '1px solid var(--primary-red)', color: 'var(--primary-red)', fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-body)' }}>
                            {selectedConv.messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        flexDirection: msg.sender === 'user' ? 'row' : 'row-reverse',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '1px solid var(--border-color)',
                                        background: msg.sender === 'user' ? 'var(--bg-white)' : 'rgba(248, 180, 0, 0.1)'
                                    }}>
                                        {msg.sender === 'user'
                                            ? <FaUser style={{ color: 'var(--text-muted)' }} />
                                            : <FaRobot style={{ color: 'var(--primary-yellow)' }} />
                                        }
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%', alignItems: msg.sender === 'user' ? 'flex-start' : 'flex-end' }}>
                                        <div style={{
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.5',
                                            background: msg.sender === 'user' ? 'var(--bg-white)' : 'rgba(248, 180, 0, 0.15)',
                                            color: 'var(--text-main)',
                                            border: '1px solid var(--border-color)',
                                            borderTopLeftRadius: msg.sender === 'user' ? 0 : '12px',
                                            borderTopRightRadius: msg.sender === 'user' ? '12px' : 0
                                        }}>
                                            {msg.content}
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', padding: '0 4px' }}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        <FaRobot size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                        <p>Select a conversation to view history</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
