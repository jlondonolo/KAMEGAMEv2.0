// src/components/profile/MainContent.jsx
import React from 'react';

const MainContent = ({ user }) => {
    return (
        <main className="bg-[#282a36] p-6 rounded-lg flex-1">
            <h1 className="text-2xl text-white font-bold mb-6 text-center">Tu Perfil</h1>

            <div className="space-y-6">
                <div>
                    <label className="block text-white font-bold mb-2">
                        Nombre de usuario:
                    </label>
                    <input
                        type="text"
                        value={user.username}
                        disabled
                        className="w-full p-2 bg-[#1e1e2f] text-white border border-[#44475a] rounded"
                    />
                </div>

                <div>
                    <label className="block text-white font-bold mb-2">
                        País:
                    </label>
                    <input
                        type="text"
                        value={user.country}
                        disabled
                        className="w-full p-2 bg-[#1e1e2f] text-white border border-[#44475a] rounded"
                    />
                </div>

                <div className="mt-8">
                    <h2 className="text-xl text-white font-bold mb-4">Información</h2>
                    <table className="w-full">
                        <tbody>
                        <tr className="border-b border-[#44475a]">
                            <td className="py-3 text-gray-300 hover:text-white cursor-pointer">
                                Datos de mi cuenta
                            </td>
                        </tr>
                        <tr className="border-b border-[#44475a]">
                            <td className="py-3 text-gray-300 hover:text-white cursor-pointer">
                                Seguridad y privacidad
                            </td>
                        </tr>
                        <tr className="border-b border-[#44475a]">
                            <td className="py-3 text-gray-300 hover:text-white cursor-pointer">
                                Comunicaciones y ayudas
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default MainContent;