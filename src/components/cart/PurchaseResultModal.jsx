// src/components/PurchaseResultModal.jsx
import React from 'react';

const PurchaseResultModal = ({ result, onClose }) => {
    if (!result) return null;

    // Función para obtener el color por nivel
    const getLevelColor = (level) => {
        if (level <= 3) return 'text-green-400';
        if (level <= 5) return 'text-blue-400';
        if (level <= 8) return 'text-purple-400';
        return 'text-yellow-400';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-[#1e1e2f] p-6 rounded-lg max-w-3xl max-h-[80vh] overflow-auto">
                <h2 className="text-white text-2xl font-bold mb-4">¡Compra completada!</h2>
                <p className="text-white mb-2">Has obtenido {result.totalCards} cartas por ${result.totalSpent.toFixed(2)}</p>

                <div className="mt-4">
                    <h3 className="text-white text-xl font-bold mb-2">Cartas obtenidas:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {result.cards.map((card, index) => (
                            <div key={index} className="bg-[#2a2a3d] p-2 rounded">
                                <img
                                    src={card.image || card.card_images?.[0]?.image_url || '/default-card.jpg'}
                                    alt={card.name}
                                    className="w-full h-auto aspect-[3/4] object-cover rounded mb-2"
                                />
                                <p className="text-white text-sm font-medium truncate">{card.name}</p>
                                <p className={`text-sm ${getLevelColor(card.level)}`}>
                                    Nivel: {card.level}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {card.attribute && `Atributo: ${card.attribute}`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 bg-[#007bff] text-white py-2 px-4 rounded hover:bg-[#0056b3] transition-colors"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default PurchaseResultModal;