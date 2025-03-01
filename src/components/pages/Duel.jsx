import React, { useState, useEffect } from "react";
import { useInventory } from "../../hooks/useInventory.js";

// Función auxiliar para obtener la carta completa
const getCompleteCard = (card) => {
  if (card.atk != null && card.def != null) return card;
  const allCards = JSON.parse(localStorage.getItem("allCards")) || [];
  const completeCard = allCards.find((c) => c.name === card.name);
  return completeCard || card;
};

// Función para calcular daño basado en ataque y defensa
const calcularDanio = (atk, def) => {
  const diferencia = atk - def;
  return diferencia > 0 ? diferencia : 0;
};

const Duel = () => {
  const { inventory } = useInventory();
  const allCards = JSON.parse(localStorage.getItem("allCards")) || [];

  // Para controlar si el duelo ya comenzó
  const [hasStarted, setHasStarted] = useState(false);

  // Para mostrar el gif de inicio a pantalla completa
  const [showGif, setShowGif] = useState(false);

  // Estados de vida
  const [playerLife, setPlayerLife] = useState(3500);
  const [cpuLife, setCpuLife] = useState(3500);

  // Estados para las cartas en batalla
  const [playerCard, setPlayerCard] = useState(null);
  const [cpuCard, setCpuCard] = useState(null);

  // Estado para las cartas en la mano del jugador
  const [playerHand, setPlayerHand] = useState([]);

  // Estado para indicar si hay un ganador (null => sigue el duelo)
  const [winner, setWinner] = useState(null);

  // ==== GIFs de resultado ====
  const [finalGif, setFinalGif] = useState(null);       // Ruta del GIF final
  const [showFinalGif, setShowFinalGif] = useState(false); // Overlay de GIF final

  // Al cargar el inventario, actualizamos la mano del jugador
  useEffect(() => {
    if (inventory.length > 0) {
      setPlayerHand(inventory);
    }
  }, [inventory]);

  // Cada vez que "winner" cambie, vemos si hay que mostrar un GIF final
  useEffect(() => {
    if (!winner) return; // si no hay ganador, no hacemos nada

    let gifPath = "";
    if (winner === "Jugador") {
      gifPath = "/gifs/Victoria.gif"; 
    } else if (winner === "CPU") {
      gifPath = "/gifs/perdiste.gif"; 
    } else if (winner === "Empate") {
      gifPath = "/gifs/Empate.gif";
    }

    setFinalGif(gifPath);
    setShowFinalGif(true);

    // Mostramos el GIF final, por ejemplo, 5 segundos.
    // Ajusta a 10, 7, 3, etc., lo que necesites.
    const timer = setTimeout(() => {
      setShowFinalGif(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [winner]);

  // Manejo del turno cuando el jugador selecciona una carta
  const handleTurn = (selectedCard) => {
    if (winner) return; // No hacemos nada si ya hay ganador

    const completePlayerCard = getCompleteCard(selectedCard);
    setPlayerCard(completePlayerCard);

    const randomCpuCard =
      allCards.length > 0
        ? getCompleteCard(allCards[Math.floor(Math.random() * allCards.length)])
        : {
            name: "Carta CPU",
            atk: 1000,
            def: 1000,
            image_url: "/default-card.png",
          };

    setCpuCard(randomCpuCard);

    // Calculamos el daño
    const damageToCpu = calcularDanio(completePlayerCard.atk, randomCpuCard.def);
    const damageToPlayer = calcularDanio(randomCpuCard.atk, completePlayerCard.def);

    // Actualizamos vidas
    const newCpuLife = cpuLife - damageToCpu;
    const newPlayerLife = playerLife - damageToPlayer;

    setCpuLife(newCpuLife);
    setPlayerLife(newPlayerLife);

    // Verificamos si alguien llegó a 0
    if (newCpuLife <= 0 && newPlayerLife <= 0) {
      setWinner("Empate");
    } else if (newCpuLife <= 0) {
      setWinner("Jugador");
    } else if (newPlayerLife <= 0) {
      setWinner("CPU");
    }
  };

  // Función para reiniciar el duelo
  const resetDuel = () => {
    setPlayerLife(3500);
    setCpuLife(3500);
    setPlayerCard(null);
    setCpuCard(null);
    setWinner(null);
    setFinalGif(null);
    setShowFinalGif(false);
  };

  // Muestra "N/A" si un stat es null
  const displayStat = (stat) => (stat != null ? stat : "N/A");

  // Al hacer clic en "Iniciar Duelo"
  const handleStartDuel = () => {
    // Mostramos el GIF de inicio
    setShowGif(true);

    // Esperamos 10s (10000 ms) para que el GIF termine
    setTimeout(() => {
      setShowGif(false);
      setHasStarted(true);
    }, 10000);
  };

  // ==================== RENDER ====================

  // 1) Si showGif = true, mostramos el GIF de inicio a pantalla completa
  if (showGif) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden flex items-center justify-center">
        <img
          src="/gifs/inicio_de_duelo.gif"
          alt="Gif de inicio"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // 2) Si el duelo no ha iniciado (y no estamos mostrando GIF), botón para iniciarlo
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-[#1e1e2f] p-8 flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl font-bold mb-6">Duelo</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded text-xl"
          onClick={handleStartDuel}
        >
          Iniciar Duelo
        </button>
      </div>
    );
  }

  // 3) Si hasStarted = true, mostramos la interfaz completa del duelo
  return (
    <div className="min-h-screen bg-[#1e1e2f] p-8 relative">

      {/* Si showFinalGif = true, mostramos el overlay del GIF final */}
      {showFinalGif && finalGif && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-hidden flex items-center justify-center">
          <img
            src={finalGif}
            alt="Resultado"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-white text-3xl font-bold text-center mb-6">Duelo</h1>

      {/* Mensaje de ganador solo si winner existe y ya terminó el GIF */}
      {winner && !showFinalGif && (
        <div className="text-center mb-6">
          {winner === "Empate" ? (
            <p className="text-white text-2xl">¡Es un empate!</p>
          ) : winner === "Jugador" ? (
            <p className="text-white text-2xl">¡Has ganado!</p>
          ) : (
            <p className="text-white text-2xl">La CPU ha ganado</p>
          )}
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={resetDuel}
          >
            Nuevo Duelo
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Zona de batalla */}
        <div className="flex-grow">
          <div className="flex justify-center gap-20 items-center mb-10">
            {/* Jugador */}
            <div className="text-center">
              <h2 className="text-white text-xl font-bold">Tú</h2>
              <p className="text-white">Vida: {playerLife}</p>
              <div className="w-[150px] h-[220px] bg-gray-700 flex items-center justify-center rounded-md mx-auto mt-2">
                {playerCard ? (
                  <div className="w-full h-full flex flex-col items-center">
                    <img
                      src={playerCard.image_url}
                      alt={playerCard.name}
                      className="max-w-full h-auto object-contain"
                    />
                    <p className="text-white">{playerCard.name}</p>
                    <p className="text-gray-400">
                      ATK: {displayStat(playerCard.atk)}
                    </p>
                    <p className="text-gray-400">
                      DEF: {displayStat(playerCard.def)}
                    </p>
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
              <div className="w-[150px] h-[220px] bg-gray-700 flex items-center justify-center rounded-md mx-auto mt-2">
                {cpuCard ? (
                  <div className="w-full h-full flex flex-col items-center">
                    <img
                      src={cpuCard.image_url}
                      alt={cpuCard.name}
                      className="w-full max-w-xs h-auto object-contain"
                    />
                    <p className="text-white">{cpuCard.name}</p>
                    <p className="text-gray-400">
                      ATK: {displayStat(cpuCard.atk)}
                    </p>
                    <p className="text-gray-400">
                      DEF: {displayStat(cpuCard.def)}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">Esperando...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mano de cartas del jugador */}
        <div className="w-[300px]">
          <h2 className="text-white text-xl font-bold mb-4">Tus Cartas</h2>
          {playerHand.length > 0 ? (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] p-2">
              {playerHand.map((card, index) => {
                const completeCard = getCompleteCard(card);
                return (
                  <div
                    key={index}
                    className={`bg-gray-800 flex flex-col items-center justify-center 
                      rounded-md p-2 cursor-pointer hover:bg-gray-700 
                      ${winner ? "pointer-events-none opacity-50" : ""}`}
                    onClick={() => handleTurn(card)}
                  >
                    <img
                      src={completeCard.image_url}
                      alt={completeCard.name}
                      className="w-full h-[120px] object-contain"
                    />
                    <p className="text-white text-sm mt-1">{completeCard.name}</p>
                    <p className="text-gray-400 text-xs">
                      ATK: {displayStat(completeCard.atk)}
                    </p>
                    <p className="text-gray-400 text-xs">
                      DEF: {displayStat(completeCard.def)}
                    </p>
                    <button
                      className="mt-2 bg-blue-600 text-white px-2 py-1 text-xs rounded"
                      disabled={!!winner}
                    >
                      Seleccionar
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">
              No tienes cartas en el inventario. Compra algunas en la tienda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Duel;
