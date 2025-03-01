// src/components/store/Store.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Store = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/store/cards'); // Asegúrate de que la URL sea correcta
                setCards(response.data); // Guarda las cartas en el estado
            } catch (err) {
                setError('Error al cargar las cartas');
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Cartas en la Tienda</h2>
            <div>
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <div key={card.id}>
                            <img src={card.image_url} alt={card.name} />
                            <p>{card.name}</p>
                            <p>{card.price}</p>
                            <button>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No hay cartas disponibles en la tienda.</p>
                )}
            </div>
        </div>
    );
};

export default Store;
