// src/components/profile/Sidebar.jsx
import React from 'react';
import {LogOut, LucideSmile} from 'lucide-react';

const Sidebar = ({ user, userLevel, onLogout, onCartClick }) => {
    // Determinar el nivel basado en los puntos mágicos
    const getMagicLevel = (points) => {
        if (points >= 2000) return { name: "Avanzado", color: "#ff9500" };
        if (points >= 1000) return { name: "Principiante", color: "#7a47fa" };
        return { name: "Novato", color: "#4fa0ff" };
    };

    const magicPoints = user.magicPoints || 0;
    const magicLevel = getMagicLevel(magicPoints);

    // Calcular porcentaje para la barra de progreso
    const getProgressPercentage = (points) => {
        if (points >= 2000) return 100;
        if (points >= 1000) return (points - 1000) / 10; // De 0% a 100% entre 1000 y 2000
        return points / 10; // De 0% a 100% entre 0 y 1000
    };

    const progressPercentage = getProgressPercentage(magicPoints);

    return (
        <aside className="bg-[#282a36] p-4 rounded-lg w-full md:w-56 shadow-xl">
            <div className="text-center">
                <div className="mb-4 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2e04c5] to-[#7a47fa] blur-md opacity-70"></div>
                    <img
                        src={user.avatar || "/logo/pegasus.webp"}
                        alt="Perfil"
                        className="w-32 h-32 rounded-full border-2 border-white mx-auto relative z-10 transition-transform hover:scale-105 duration-300"
                    />
                    <div
                        className="w-10 h-10 rounded-full absolute -bottom-1 right-1/4 z-20 flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: magicLevel.color }}
                    >
                        {userLevel.level}
                    </div>
                </div>

                {/* Barra de progreso sin etiquetas */}
                <div className="mb-6">
                    <div className="bg-[#44475a] h-2.5 rounded-full mb-3 overflow-hidden relative">
                        <div
                            className="h-full rounded-full relative"
                            style={{
                                width: `${progressPercentage}%`,
                                background: `linear-gradient(to right, ${magicPoints < 1000 ? '#4fa0ff, #2e04c5' : magicPoints < 2000 ? '#7a47fa, #2e04c5' : '#ff9500, #ff5555'})`
                            }}
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Solo mostrar nombre de usuario y nivel */}
                    <p className="text-white font-medium text-sm mb-1">
                        {user.username}
                    </p>
                    <p className="text-white font-medium text-sm">
                        Nivel: <span className="text-[#7a47fa]">{userLevel.level}</span>
                    </p>
                </div>

                {/* Botón de carrito */}
                <button
                    onClick={onCartClick}
                    className="w-full mb-3 px-3 py-2 bg-gradient-to-r from-[#2e04c5] to-[#7a47fa] text-white text-sm rounded hover:shadow-lg transition-all hover:-translate-y-0.5 duration-300 flex items-center justify-center gap-2"
                >
                    <LucideSmile size={16} />
                    Ir al Carrito
                </button>

                {/* Botón de cerrar sesión */}
                <button
                    onClick={onLogout}
                    className="w-full mt-1 px-3 py-2 bg-gradient-to-r from-[#ff5555] to-[#ff4444] text-white text-sm rounded hover:from-[#ff4444] hover:to-[#ff3333] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
                >
                    <LogOut size={16} />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;