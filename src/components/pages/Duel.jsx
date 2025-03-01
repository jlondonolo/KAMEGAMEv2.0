// src/components/pages/Duel.jsx
import React, { useState, useEffect } from 'react';
import { useInventory } from '../../hooks/useInventory';
import { startDuel } from '../../services/duelService';  // Asegúrate de tener esta función en duelService.js

const Duel = () => {
    const { inventory } = useInventory();  // Obtener el inventario del usuario
    const [playerLife, setPlayerLife] = useState(3500);
    const [cpuLife, setCpuLife] = useState(3500);
    const [playerCard, setPlayerCard] = useState(null);
    const [cpuCard, setCpuCard] = useState(null);

    const handleDuelStart = async (cardId) => {
        const result = await startDuel(cardId);
        setPlayerCard(result.userCard);
        setCpuCard(result.cpuCard);

        // Aquí puedes agregar lógica para actualizar la vida o los resultados del duelo
        if (result.result === '¡Ganaste el duelo!') {
            setCpuLife(cpuLife - 500);  // Ejemplo de lógica de daño
        } else {
            setPlayerLife(playerLife - 500);  // Lógica de daño
        }
    };

    return (
        <div>
            <h1>Duelo</h1>
            <div>
                <h2>Tu Vida: {playerLife}</h2>
                <h2>Vida del CPU: {cpuLife}</h2>
            </div>
            <div>
                {inventory.length > 0 && (
                    <div>
                        <h2>Selecciona tu carta para el duelo</h2>
                        {inventory.map((card) => (
                            <div key={card._id}>
                                <img src={card.image_url} alt={card.name} />
                                <button onClick={() => handleDuelStart(card._id)}>
                                    Iniciar Duelo con {card.name}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {playerCard && cpuCard && (
                    <div>
                        <h3>Tu Carta: {playerCard.name}</h3>
                        <p>ATK: {playerCard.atk} | DEF: {playerCard.def}</p>
                        <h3>Carta del CPU: {cpuCard.name}</h3>
                        <p>ATK: {cpuCard.atk} | DEF: {cpuCard.def}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Duel;
