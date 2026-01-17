import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/auth/Login';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ProfileManagement from './pages/admin/ProfileManagement';
import ApiDocs from './pages/admin/ApiDocs';
import Messages from './pages/admin/Messages';
import Resources from './pages/admin/Resources';

import Settings from './pages/admin/Settings';

import Loading from './components/Loading';
import { profileService } from './services/profileService';
import type { Profile } from './services/profileService';
import './index.css';

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getPublicProfile();
        setProfile(data);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        // We still let loading finish so users can potentially login
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Allow the app to render even if public profile fetch fails, 
  // so the admin login can still be accessed, but show error for public routes if needed.
  // Ideally, we might want separate error boundary for public part.

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout profile={profile} />}>
              <Route path="/" element={<Home />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/profile" element={<ProfileManagement />} />
                {/* Projects is now part of Profile Management */}
                <Route path="/admin/projects" element={<Navigate to="/admin/profile" replace />} />
                <Route path="/admin/api-docs" element={<ApiDocs />} />
                <Route path="/admin/messages" element={<Messages />} />
                <Route path="/admin/resources" element={<Resources />} />
                <Route path="/admin/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
