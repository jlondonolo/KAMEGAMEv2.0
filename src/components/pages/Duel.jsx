// src/pages/Duel.jsx
import React, { useState, useEffect } from "react";
import { useInventory } from "../../hooks/useInventory.js";

const Duel = () => {
    const { inventory } = useInventory(); // Cargar cartas desde el inventario real

    // Estado de vida de cada jugador
    const [playerLife, setPlayerLife] = useState(3500);
    const [cpuLife, setCpuLife] = useState(3500);

    // Estado para la carta seleccionada en batalla
    const [playerCard, setPlayerCard] = useState(null);
    const [cpuCard, setCpuCard] = useState(null);

    // Estado para las cartas en la mano del jugador
    const [playerHand, setPlayerHand] = useState([]);

    // Cargar las cartas del inventario al iniciar el duelo
    useEffect(() => {
        console.log("Inventario cargado:", inventory); // Ver la estructura real en la consola
        if (inventory.length > 0) {
            setPlayerHand(inventory);
        }
    }, [inventory]);

    // Función para seleccionar una carta y colocarla en batalla
    const selectCard = (card) => {
        setPlayerCard(card);

        // CPU selecciona una carta aleatoria del inventario
        const randomCpuCard = inventory.length
            ? inventory[Math.floor(Math.random() * inventory.length)]
            : { name: "Carta CPU", atk: 1000, def: 1000, image_url: "/default-card.png" };

        setCpuCard(randomCpuCard);
    };

    return (
        <div className="min-h-screen bg-[#1e1e2f] p-8">
            <h1 className="text-white text-3xl font-bold text-center mb-6">Duelo</h1>

            {/* Área de batalla */}
            <div className="flex justify-center gap-20 items-center mb-10">
                {/* Jugador */}
                <div className="text-center">
                    <h2 className="text-white text-xl font-bold">Tu</h2>
                    <p className="text-white">Vida: {playerLife}</p>
                    <div className="w-64 h-40 bg-gray-700 flex items-center justify-center rounded-md">
                        {playerCard ? (
                            <div>
                                <img src={playerCard.image_url} alt={playerCard.name} className="w-full h-auto" />
                                <p className="text-white">{playerCard.name}</p>
                                <p className="text-gray-400">ATK: {playerCard.atk}</p>
                                <p className="text-gray-400">DEF: {playerCard.def}</p>
                            </div>
                        ) : (
                            <p className="text-gray-400">Selecciona una carta</p>
                        )}
                    </div>
                </div>

                {/* CPU */}
                <div className="text-center">
                    <h2 className="text-white text-xl font-bold">CPU</h2>
                    <p className="text-white">Vida: {cpuLife}</p>
                    <div className="w-64 h-40 bg-gray-700 flex items-center justify-center rounded-md">
                        {cpuCard ? (
                            <div>
                                <img src={cpuCard.image_url} alt={cpuCard.name} className="w-full h-auto" />
                                <p className="text-white">{cpuCard.name}</p>
                                <p className="text-gray-400">ATK: {cpuCard.atk}</p>
                                <p className="text-gray-400">DEF: {cpuCard.def}</p>
                            </div>
                        ) : (
                            <p className="text-gray-400">Esperando...</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Cartas en la mano */}
            <h2 className="text-white text-xl font-bold mb-4">Tus Cartas</h2>

            {playerHand.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto">
                    {playerHand.map((card, index) => (
                        <div
                            key={index}
                            className="w-32 h-48 bg-gray-800 flex flex-col items-center justify-center rounded-md p-2 cursor-pointer hover:bg-gray-700"
                            onClick={() => selectCard(card)}
                        >
                            <img src={card.image_url} alt={card.name} className="w-full h-auto" />
                            <p className="text-white text-sm">{card.name}</p>
                            <p className="text-gray-400 text-xs">ATK: {card.atk}</p>
                            <p className="text-gray-400 text-xs">DEF: {card.def}</p>
                            <button className="mt-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">
                                Seleccionar
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-center">No tienes cartas en el inventario. Compra algunas en la tienda.</p>
            )}
        </div>
    );
};

export default Duel;
