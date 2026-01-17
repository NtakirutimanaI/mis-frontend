
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/notifications';

export interface Notification {
    id: string;
    type: 'profile_update' | 'welcome' | 'password_reset' | 'account_activity' | 'system';
    title: string;
    message: string;
    status: 'pending' | 'sent' | 'failed';
    isRead: boolean;
    metadata?: Record<string, any>;
    createdAt: string;
    sentAt?: string;
}

export const notificationService = {
    getAll: async (): Promise<Notification[]> => {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    getUnread: async (): Promise<Notification[]> => {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${API_URL}/unread`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    markAsRead: async (id: string): Promise<Notification> => {
        const token = localStorage.getItem('access_token');
        const response = await axios.patch(`${API_URL}/${id}/read`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    markAllAsRead: async (): Promise<void> => {
        const token = localStorage.getItem('access_token');
        await axios.patch(`${API_URL}/read-all`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },

    delete: async (id: string): Promise<void> => {
        const token = localStorage.getItem('access_token');
        await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};
