// src/components/pages/Store.jsx
import React, { useState, useEffect } from 'react';
import { getCards, buyCard } from '../../services/storeService';  // Asegúrate de tener estos métodos en storeService.js
import { useAuth } from '../../hooks/useAuth';

const Store = () => {
    const [cards, setCards] = useState([]);
    const { user } = useAuth(); // Obtener el usuario autenticado

    useEffect(() => {
        const fetchCards = async () => {
            const data = await getCards();
            setCards(data);
        };
        fetchCards();
    }, []);

    const handleBuyCard = async (cardId) => {
        if (!user) {
            alert("Por favor, inicia sesión primero.");
            return;
        }
        const success = await buyCard(user._id, cardId); // Suponiendo que "user._id" está disponible
        if (success) {
            alert("¡Compra realizada con éxito!");
        } else {
            alert("Error al realizar la compra.");
        }
    };

    return (
        <div>
            <h2>Cartas en la Tienda</h2>
            <div>
                {cards.map((card) => (
                    <div key={card._id}>
                        <h3>{card.name}</h3>
                        <img src={card.image_url} alt={card.name} />
                        <p>Precio: {card.price} PM</p>
                        <button onClick={() => handleBuyCard(card._id)}>
                            Comprar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Store;
