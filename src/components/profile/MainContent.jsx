// src/components/profile/MainContent.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MainContent = ({ user }) => {
    // Estado para controlar si la sección de información está desplegada
    const [infoExpanded, setInfoExpanded] = useState(false);

    // Función para alternar el estado de la sección
    const toggleInfo = () => {
        setInfoExpanded(!infoExpanded);
    };

    // Determinar el nivel basado en los puntos mágicos
    const getMagicLevel = (points) => {
        if (points >= 2000) return { name: "Avanzado", color: "#ff9500" };
        if (points >= 1000) return { name: "Principiante", color: "#7a47fa" };
        return { name: "Novato", color: "#4fa0ff" };
    };

    // Extraer la información de los puntos mágicos
    const magicPoints = user.magicPoints || 0;
    const magicLevel = getMagicLevel(magicPoints);

    // Obtener el nombre de la imagen del perfil
    const avatarName = user.avatar ? user.avatar.split('/').pop() : "Pegasus.webp";
    // Determinar si se debe mostrar el nombre de la imagen
    const isDefaultImage = !user.avatar || user.avatar.includes("Pegasus.webp");

    return (
        <main className="bg-[#282a36] p-6 rounded-lg flex-1 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 backdrop-filter backdrop-blur-sm bg-opacity-90">
            <h1 className="text-2xl text-white font-bold mb-6 text-center relative">
                Tu Perfil
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-[#7a47fa] to-transparent"></span>
            </h1>

            {/* Frase de Yu-Gi-Oh */}
            <div className="text-center mb-6">
                <p className="text-[#7a47fa] italic font-medium">"¡Cree en el corazón de las cartas!"</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-white font-bold mb-2">
                        Nombre de usuario:
                    </label>
                    <input
                        type="text"
                        value={user.username}
                        disabled
                        className="w-full p-3 bg-[#1e1e2f] text-white border border-[#44475a] rounded focus:border-[#7a47fa] focus:ring-1 focus:ring-[#7a47fa] transition-all"
                    />
                </div>

                <div className="relative flex items-center py-5">
                    <div className="flex-grow border-t border-[#44475a]"></div>
                    <span className="flex-shrink mx-4 text-[#7a47fa]">⚜</span>
                    <div className="flex-grow border-t border-[#44475a]"></div>
                </div>

                <div className="mt-2">
                    {/* Encabezado desplegable */}
                    <button
                        onClick={toggleInfo}
                        className="flex justify-between items-center w-full bg-[#1e1e2f] p-4 rounded-lg text-white hover:bg-[#2c2e3f] transition-colors"
                    >
                        <h2 className="text-xl text-white font-bold relative inline-block">
                            Información
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2e04c5] to-transparent rounded"></span>
                        </h2>
                        {infoExpanded ?
                            <ChevronUp className="text-[#7a47fa]" size={20} /> :
                            <ChevronDown className="text-[#7a47fa]" size={20} />
                        }
                    </button>

                    {/* Contenido desplegable */}
                    <div
                        className={`mt-2 transition-all duration-300 overflow-hidden ${
                            infoExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="bg-[#1e1e2f] rounded-lg overflow-hidden shadow-md">
                            <table className="w-full">
                                <tbody>
                                <tr className="border-b border-[#44475a] hover:bg-[#2c2e3f] transition-colors">
                                    <td className="py-4 px-4 text-gray-300">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">Nombre de usuario</span>
                                            <span className="text-[#7a47fa]">{user.username}</span>
                                        </div>
                                    </td>
                                </tr>
                                {/* Solo mostrar el nombre de la imagen si no es la predeterminada */}
                                {!isDefaultImage && (
                                    <tr className="border-b border-[#44475a] hover:bg-[#2c2e3f] transition-colors">
                                        <td className="py-4 px-4 text-gray-300">
                                            <div className="flex justify-between items-center">
                                                <span className="text-white">Imagen de perfil</span>
                                                <span className="text-[#7a47fa]">{avatarName}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                <tr className="border-b border-[#44475a] hover:bg-[#2c2e3f] transition-colors">
                                    <td className="py-4 px-4 text-gray-300">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">Puntos mágicos</span>
                                            <span style={{ color: magicLevel.color }} className="font-bold">{magicPoints}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#2c2e3f] transition-colors">
                                    <td className="py-4 px-4 text-gray-300">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">Nivel mágico</span>
                                            <span style={{ color: magicLevel.color }} className="font-bold">{magicLevel.name}</span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MainContent;