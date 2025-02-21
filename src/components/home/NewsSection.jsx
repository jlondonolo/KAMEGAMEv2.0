// src/components/home/NewsSection.jsx
import React, { useState, useEffect } from 'react';

const NewsSection = () => {
    const [newsCards, setNewsCards] = useState([]);

    const messages = [
        "¡Mira la nueva carta!",
        "¡Esta carta espera por ti!",
        "¡Hazla parte de tu colección!",
        "¡Descubre sus habilidades!",
        "¡Llena tu inventario con esta carta!",
        "¡Prepárate para el duelo con esta carta!"
    ];

    const getRandomMessage = () => {
        return messages[Math.floor(Math.random() * messages.length)];
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('imagenes/yu_gi_oh_detailed_cards.json');
                const data = await response.json();
                const shuffledCards = data['Effect Monster']
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);
                setNewsCards(shuffledCards);
            } catch (error) {
                console.error('Error loading cards:', error);
            }
        };

        fetchCards();
        const interval = setInterval(fetchCards, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsCards.map((card, index) => (
                <div
                    key={index}
                    className="bg-[#27293d] rounded-lg overflow-hidden
                             transform transition-all duration-300 hover:scale-105"
                >
                    <img
                        src={card.image_url}
                        alt={card.name}
                        className="w-full h-64 object-contain"
                    />
                    <p className="p-4 text-white text-center">{getRandomMessage()}</p>
                </div>
            ))}
        </div>
    );
};

export default NewsSection;