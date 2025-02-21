// src/components/home/ShopPreview.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShopPreview = () => {
    const [shopCards, setShopCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('imagenes/yu_gi_oh_detailed_cards.json');
                const data = await response.json();
                const filteredCards = data['Effect Monster']
                    .filter(card => card.atk !== null || card.def !== null)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);
                setShopCards(filteredCards);
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
            {shopCards.map((card, index) => (
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
                    <div className="p-4">
                        <button
                            onClick={() => navigate('/tienda')}
                            className="w-full bg-[#6200ee] text-white py-2 px-4 rounded
                                     hover:bg-[#7722ff] transition-colors"
                        >
                            Ir a la tienda
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShopPreview;