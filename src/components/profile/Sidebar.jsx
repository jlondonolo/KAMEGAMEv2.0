// src/components/profile/Sidebar.jsx
import React from 'react';
import { LogOut } from 'lucide-react';

const Sidebar = ({ user, userLevel, onLogout }) => {
    return (
        <aside className="bg-[#282a36] p-5 rounded-lg w-full md:w-64">
            <div className="text-center">
                <div className="mb-4">
                    <img
                        src={user.avatar || "/logo/pegasus.webp"}
                        alt="Perfil"
                        className="w-24 h-24 rounded-full border-2 border-white mx-auto"
                    />
                </div>

                <div className="mb-6">
                    <div className="bg-[#44475a] h-2.5 rounded-full mb-1">
                        <div
                            className="bg-[#2e04c5] h-full rounded-full"
                            style={{ width: `${userLevel.progress}%` }}
                        />
                    </div>
                    <p className="text-white">XP: {user.xp}</p>
                    <p className="text-white">Nivel: {userLevel.level}</p>
                </div>

                <ul className="space-y-2">
                    <li>
                        <button className="w-full text-left px-4 py-2 text-white rounded hover:bg-[#2e04c5] transition-colors active:bg-[#2e04c5]">
                            Perfil
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left px-4 py-2 text-white rounded hover:bg-[#2e04c5] transition-colors">
                            Compras
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left px-4 py-2 text-white rounded hover:bg-[#2e04c5] transition-colors">
                            Ventas
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left px-4 py-2 text-white rounded hover:bg-[#2e04c5] transition-colors">
                            Actividad
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left px-4 py-2 text-white rounded hover:bg-[#2e04c5] transition-colors">
                            Transacciones
                        </button>
                    </li>
                </ul>

                <button
                    onClick={onLogout}
                    className="w-full mt-6 px-4 py-2 bg-[#ff5555] text-white rounded hover:bg-[#ff4444] transition-colors flex items-center justify-center gap-2"
                >
                    <LogOut size={18} />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
};


export default Sidebar;