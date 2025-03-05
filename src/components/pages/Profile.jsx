// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile.js';
import { useAuth } from '../../hooks/useAuth.js';
import Sidebar from '../../components/profile/Sidebar.jsx';
import MainContent from '../../components/profile/MainContent.jsx';
import ParticlesBackground from '../../components/profile/ParticlesBackground';

const Profile = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isInitialized } = useAuth();
    const { user, userLevel, logout } = useProfile();
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

    const goToCart = () => {
        navigate('/carrito'); // Navega a la página del carrito
    };

    // Comprobar si 'user' es válido antes de pasar al renderizado
    if (!user) {
        return <div>Loading...</div>; // O mostrar un mensaje de carga
    }

    const updatedUser = {
        ...user,
        avatar: user.avatar || "/logo/Pegasus.webp", // Aseguramos un valor por defecto
        magicPoints: magicPoints // Añadimos los puntos mágicos al objeto de usuario
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#252540] relative">
            <ParticlesBackground />
            <div className="container mx-auto px-4 py-8">
                {/* Contenedor para mostrar el título y los puntos mágicos */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl text-white">Perfil</h1>
                    <div className="bg-gradient-to-r from-[#2e04c5] to-[#7a47fa] p-0.5 rounded-lg shadow-lg">
                        <div className="bg-[#1e1e2f] px-4 py-2 rounded-lg flex items-center gap-2">
                            <span className="text-white font-medium">Puntos mágicos:</span>
                            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7a47fa] to-[#2e04c5]">{magicPoints}</span>
                            <span className="text-xs text-[#7a47fa]">+</span>
                        </div>
                    </div>
                </div>

                {/* Componente principal con el contenido del perfil */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Barra lateral del perfil con botones de carrito y cerrar sesión */}
                    <Sidebar
                        user={updatedUser}
                        userLevel={userLevel}
                        onLogout={handleLogout}
                        onCartClick={goToCart}
                    />

                    {/* Contenido principal del perfil */}
                    <MainContent user={updatedUser} />
                </div>
            </div>
        </div>
    );
};

export default Profile;