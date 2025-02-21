import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart.js';
import { ImageModal } from './ImageModal.jsx';

const CardGrid = ({ cards, calculatePrice }) => {
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleAddToCart = (card) => {
        const price = calculatePrice(card);
        addToCart({
            name: card.name,
            price,
            image: card.image_url,
            quantity: 1
        });

        // Mostrar notificación
        setNotificationMessage(`${card.name} se agregó al carrito`);
        setShowNotification(true);

        // Ocultar notificación después de 3 segundos
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={`${card.id}-${index}`}
                        className="bg-[#1e1e2f] rounded-lg p-4 flex flex-col transition-transform duration-300 hover:transform hover:scale-105"
                    >
                        <img
                            src={card.image_url}
                            alt={card.name}
                            className="w-full h-96 object-contain mb-4 cursor-pointer"
                            onClick={() => setSelectedImage(card.image_url)}
                        />
                        <div className="flex flex-col flex-grow">
                            <h4 className="text-white font-bold text-center mb-2">{card.name}</h4>
                            <p className="text-[#7a04c5] font-bold text-center mb-4">
                                {calculatePrice(card)} PM
                            </p>
                            <button
                                onClick={() => handleAddToCart(card)}
                                className="mt-auto bg-[#6200ee] text-white py-2 px-4 rounded hover:bg-[#7722ff] transition-colors"
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <ImageModal
                    imageUrl={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}

            {/* Notificación */}
            {showNotification && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up">
                    {notificationMessage}
                </div>
            )}
        </>
    );
};

export default CardGrid;