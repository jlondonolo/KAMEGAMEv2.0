// src/components/pages/Inventory.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getInventory, removeFromInventory } from '../../services/inventoryService'; // Importa los servicios correspondientes

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const fetchInventory = async () => {
                const data = await getInventory(user._id);
                setInventory(data);
            };
            fetchInventory();
        }
    }, [user]);

    const handleRemove = async (cardId) => {
        const updatedInventory = await removeFromInventory(user._id, cardId);
        setInventory(updatedInventory);  // Actualiza el estado después de eliminar la carta
    };

    return (
        <div>
            <h2>Tu Inventario</h2>
            <div>
                {inventory.length > 0 ? (
                    inventory.map((card) => (
                        <div key={card._id}>
                            <h3>{card.name}</h3>
                            <img src={card.image_url} alt={card.name} />
                            <p>ATK: {card.atk} | DEF: {card.def}</p>
                            <button onClick={() => handleRemove(card._id)}>
                                Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tienes cartas en tu inventario.</p>
                )}
            </div>
        </div>
    );
};

export default Inventory;
