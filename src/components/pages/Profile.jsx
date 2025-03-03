// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile.js';
import { useAuth } from '../../hooks/useAuth.js';
import Sidebar from '../../components/profile/Sidebar.jsx';
import MainContent from '../../components/profile/MainContent.jsx';
import FavoriteCards from '../../components/profile/FavoriteCards.jsx';

const Profile = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isInitialized } = useAuth();
    const { user, favoriteCards, userLevel, logout } = useProfile();
    const [magicPoints, setMagicPoints] = useState(0); // Estado para los puntos mágicos

    useEffect(() => {
        if (isInitialized && !isAuthenticated()) {
            navigate('/login');
        }
    }, [isInitialized, isAuthenticated, navigate]);

    // Obtener los puntos mágicos del usuario cuando el componente se monta
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (storedUser && storedUser.magicPoints !== undefined) {
            setMagicPoints(storedUser.magicPoints); // Establecer los puntos mágicos
        }
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Comprobar si 'user' es válido antes de pasar al renderizado
    if (!user) {
        return <div>Loading...</div>; // O mostrar un mensaje de carga
    }

    const updatedUser = {
        ...user,
        avatar: user.avatar || "/logo/Pegasus.webp" // Aseguramos un valor por defecto
    };

    return (
        <div className="min-h-screen bg-[#1e1e2f]">
            <div className="container mx-auto px-4 py-8">
                {/* Contenedor para mostrar el título y los puntos mágicos */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl text-white">Perfil</h1>
                    <div className="text-white">
                        Puntos mágicos: {magicPoints} {/* Muestra los puntos mágicos */}
                    </div>
                </div>

                {/* Componente principal con el contenido del perfil */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Barra lateral del perfil */}
                    <Sidebar user={updatedUser} userLevel={userLevel} onLogout={handleLogout} />
                    
                    {/* Contenido principal del perfil */}
                    <MainContent user={updatedUser} />
                    
                    {/* Cartas favoritas */}
                    <FavoriteCards favorites={favoriteCards} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
