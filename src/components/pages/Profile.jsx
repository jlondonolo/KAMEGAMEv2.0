// src/pages/Profile.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile.js';
import { useAuth } from '../../hooks/useAuth.js';
import Sidebar from '../../components/profile/Sidebar.jsx';
import MainContent from '../../components/profile/MainContent.jsx';
import FavoriteCards from '../../components/profile/FavoriteCards.jsx';

const Profile = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isInitialized } = useAuth();
    const {
        user,
        favoriteCards,
        userLevel,
        logout
    } = useProfile();

    useEffect(() => {
        if (isInitialized && !isAuthenticated()) {
            navigate('/login');
        }
    }, [isInitialized, isAuthenticated, navigate]);

    // Mostrar un loader mientras se verifica la autenticación
    if (!isInitialized) {
        return <div className="min-h-screen bg-[#1e1e2f] flex items-center justify-center">
            <div className="text-white">Cargando...</div>
        </div>;
    }

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#1e1e2f]">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <Sidebar
                        user={user}
                        userLevel={userLevel}
                        onLogout={handleLogout}
                    />
                    <MainContent user={user} />
                    <FavoriteCards favorites={favoriteCards} />
                </div>
            </div>
        </div>
    );
};

export default Profile;