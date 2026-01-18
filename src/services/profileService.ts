import api from './api';

export interface ContactMessage {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
    status?: 'new' | 'unread' | 'read' | 'replied';
    createdAt?: string;
}

export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    bio: string;
    title: string;
    type?: string;
    role?: string;
    location: string;
    phone: string;
    website: string;
    avatar: string;
    yearsOfExperience: number;
    availableForHire: boolean;
    isPublic: boolean;
    poweredBy?: string;
    education: Array<{
        degree: string;
        institution: string;
        location: string;
        graduationYear: number;
        description?: string;
    }>;
    experience: Array<{
        title: string;
        company: string;
        location: string;
        startDate: string;
        endDate?: string;
        current: boolean;
        description?: string;
        technologies: string[];
    }>;
    skills: {
        backend: string[];
        frontend: string[];
        databases: string[];
        tools: string[];
        [key: string]: string[];
    };
    projects: Array<{
        name: string;
        description: string;
        technologies: string[];
        url?: string;
        githubUrl?: string;
        imageUrl?: string;
        featured: boolean;
        category?: 'Backend' | 'Frontend' | 'UI/UX' | 'Fullstack' | 'Other';
        effectiveness?: number; // 0-100
        published?: boolean;
        type?: string;
        role?: string;
    }>;
    certifications: Array<{
        name: string;
        issuer: string;
        date: string;
        credentialUrl?: string;
    }>;
    languages: Array<{
        language: string;
        proficiency: string;
    }>;
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        [key: string]: string | undefined;
    };
    services: string[];
    createdAt: string;
    updatedAt: string;
}

export const profileService = {
    // Get public profile
    getPublicProfile: async (username?: string): Promise<Profile> => {
        const response = await api.get('/profile/public', {
            params: username ? { username } : {},
        });
        return response.data;
    },

    // Send contact message
    sendContactMessage: async (message: ContactMessage) => {
        const response = await api.post('/profile/contact', message);
        return response.data;
    },

    // Get contact messages (Admin)
    getContactMessages: async (): Promise<ContactMessage[]> => {
        const response = await api.get('/profile/messages');
        return response.data;
    },

    // Get authenticated user profile
    getMyProfile: async (): Promise<Profile> => {
        const response = await api.get('/profile');
        return response.data;
    },

    // Update profile
    updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
        const response = await api.put('/profile', data);
        return response.data;
    },

    // Get admin stats
    getStats: async (): Promise<{ projects: number; skills: number; messages: number; views: number; clients: number }> => {
        const response = await api.get('/profile/stats');
        return response.data;
    },

    // Fetch GitHub Repos
    getGithubRepos: async (username: string) => {
        // We use direct fetch here to avoid configured axios interceptors that might send our backend auth token
        // which GitHub would reject (unless we strip it).
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        if (!response.ok) throw new Error('Failed to fetch from GitHub');
        return response.json();
    },

    // Mark message as read
    markMessageAsRead: async (messageId: string): Promise<ContactMessage> => {
        const response = await api.post(`/profile/messages/${messageId}/read`);
        return response.data;
    }
};
