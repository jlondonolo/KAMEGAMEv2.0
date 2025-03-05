import React, { useState, useEffect } from "react";
import { useInventory } from "../../hooks/useInventory.js";

// Función para calcular daño basado en ataque y defensa
const calcularDanio = (atk, def) => {
  const diferencia = atk - def;
  return diferencia > 0 ? diferencia : 0;
};

// Función para obtener cartas de muestra desde localStorage o cargarlas si no existen
const getSampleCards = () => {
  try {
    // Intentar obtener cartas de muestra desde localStorage
    const sampleCards = JSON.parse(localStorage.getItem("sampleCards"));
    if (sampleCards && Array.isArray(sampleCards) && sampleCards.length >= 10) {
      console.log("Cartas de muestra cargadas desde localStorage:", sampleCards.length);
      return sampleCards;
    }

    // Si no existen o son insuficientes, intentar obtener del localStorage completo
    const allCards = JSON.parse(localStorage.getItem("allCards")) || [];
    if (allCards.length > 0) {
      // Agrupar por nivel
      const cardsByLevel = {};
      allCards.forEach(card => {
        const level = card.level || 0;
        if (!cardsByLevel[level]) {
          cardsByLevel[level] = [];
        }

        // Solo agregamos la carta si tiene atk y def
        if (card.atk !== undefined && card.def !== undefined) {
          cardsByLevel[level].push(card);
        }
      });

      // Seleccionar 10 cartas de cada nivel (o todas si hay menos de 10)
      let selectedCards = [];
      Object.keys(cardsByLevel).forEach(level => {
        const cardsOfLevel = cardsByLevel[level];
        const sampleSize = Math.min(10, cardsOfLevel.length);

        if (cardsOfLevel.length > 0) {
          const sample = cardsOfLevel
            .sort(() => 0.5 - Math.random())
            .slice(0, sampleSize);
          selectedCards = [...selectedCards, ...sample];
        }
      });

      // Guardar en localStorage para futuras cargas solo si tenemos suficientes
      if (selectedCards.length >= 10) {
        localStorage.setItem("sampleCards", JSON.stringify(selectedCards));
        console.log("Nuevas cartas de muestra guardadas en localStorage:", selectedCards.length);
        return selectedCards;
      }
    }

    console.log("No se pudieron cargar cartas de muestra, devolviendo array vacío");
    return [];
  } catch (error) {
    console.error("Error al cargar cartas de muestra:", error);
    return [];
  }
};

const Duel = () => {
  const { inventory } = useInventory();

  const [hasStarted, setHasStarted] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const [playerLife, setPlayerLife] = useState(3500);
  const [cpuLife, setCpuLife] = useState(3500);

  const [playerCard, setPlayerCard] = useState(null);
  const [cpuCard, setCpuCard] = useState(null);

  const [playerHand, setPlayerHand] = useState([]);
  const [winner, setWinner] = useState(null);

  const [finalGif, setFinalGif] = useState(null);
  const [showFinalGif, setShowFinalGif] = useState(false);

  const [useInventoryCards, setUseInventoryCards] = useState(true);
  const [sampleCards, setSampleCards] = useState([]);

  useEffect(() => {
    if (inventory.length === 0) return;

    const validCards = inventory.filter(item =>
      item.type !== "package" &&
      !item.name?.includes("Paquete") &&
      (item.atk !== undefined && item.def !== undefined)
    );

    if (validCards.length >= 10) {
      console.log("Usando cartas del inventario:", validCards.length);
      setPlayerHand(validCards);
      setUseInventoryCards(true);
    } else {
      console.log("No hay suficientes cartas en inventario, cargando cartas de muestra...");
      const samples = getSampleCards();
      setSampleCards(samples);
      setPlayerHand([...validCards, ...samples]);
      setUseInventoryCards(false);
    }
  }, [inventory.length]);

  useEffect(() => {
    if (!winner) return;

    let gifPath = "";
    if (winner === "Jugador") {
      gifPath = "/gifs/victoria.mp4";
    } else if (winner === "CPU") {
      gifPath = "/gifs/perdiste.mp4";
    } else if (winner === "Empate") {
      gifPath = "/gifs/Empate.mp4";
    }

    setFinalGif(gifPath);
    setShowFinalGif(true);

    const timer = setTimeout(() => {
      setShowFinalGif(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [winner]);

  const handleTurn = (selectedCard) => {
    if (winner) return;

    setPlayerCard(selectedCard);

    let cpuCardPool = [];
    if (useInventoryCards) {
      cpuCardPool = playerHand.filter(card => card.atk !== undefined && card.def !== undefined);
    } else {
      cpuCardPool = [...playerHand].filter(card => card.atk !== undefined && card.def !== undefined);
      if (cpuCardPool.length < 5 && sampleCards.length > 0) {
        cpuCardPool = sampleCards.filter(card => card.atk !== undefined && card.def !== undefined);
      }
    }

    const defaultCpuCard = {
      name: "Carta CPU",
      atk: 1000,
      def: 1000,
      image_url: "/imagenes/placeholder-card.webp",
    };

    const randomCpuCard =
      cpuCardPool.length > 0
        ? { ...cpuCardPool[Math.floor(Math.random() * cpuCardPool.length)] }
        : defaultCpuCard;

    setCpuCard(randomCpuCard);

    const damageToCpu = calcularDanio(selectedCard.atk || 0, randomCpuCard.def || 0);
    const damageToPlayer = calcularDanio(randomCpuCard.atk || 0, selectedCard.def || 0);

    const newCpuLife = cpuLife - damageToCpu;
    const newPlayerLife = playerLife - damageToPlayer;

    setCpuLife(newCpuLife);
    setPlayerLife(newPlayerLife);

    if (newCpuLife <= 0 && newPlayerLife <= 0) {
      setWinner("Empate");
    } else if (newCpuLife <= 0) {
      setWinner("Jugador");
    } else if (newPlayerLife <= 0) {
      setWinner("CPU");
    }
  };

  const resetDuel = () => {
    setPlayerLife(3500);
    setCpuLife(3500);
    setPlayerCard(null);
    setCpuCard(null);
    setWinner(null);
    setFinalGif(null);
    setShowFinalGif(false);
  };

  const displayStat = (stat) => (stat != null ? stat : "N/A");

  const handleStartDuel = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowGif(false);
      setHasStarted(true);
    }, 10000);
  };

  // ======================================
  //                RENDER
  // ======================================
  if (showGif) {
    return (
      <div className="fixed inset-0 bg-black z-10 overflow-hidden flex items-center justify-center">
        {/* Uso de object-contain para evitar recorte en móvil */}
        <video
          src="/gifs/inicio_de_duelo.mp4"
          className="max-w-full max-h-full object-contain"
          autoPlay
        />
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-[#1e1e2f] p-4 md:p-8 flex flex-col items-center justify-center">
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

  return (
    <div className="min-h-screen bg-[#1e1e2f] p-4 md:p-8 relative">
      {showFinalGif && finalGif && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-hidden flex items-center justify-center">
          {finalGif.endsWith(".mp4") ? (
            <video
              src={finalGif}
              className="max-w-full max-h-full object-contain"
              autoPlay
            />
          ) : (
            <img
              src={finalGif}
              alt="Resultado"
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
      )}

      <h1 className="text-white text-3xl font-bold text-center mb-6">Duelo</h1>

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

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Zona de batalla */}
        <div className="flex-grow">
          {/* Contenedor Jugador/CPU */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-6 md:gap-20 mb-10">
            {/* Jugador */}
            <div className="text-center">
              <h2 className="text-white text-xl font-bold">Tú</h2>
              <p className="text-white">Vida: {playerLife}</p>
              <div className="w-[150px] bg-gray-700 flex flex-col items-center justify-start rounded-md mx-auto mt-2 p-2">
                {playerCard ? (
                  <>
                    <img
                      src={playerCard.image_url || "/imagenes/placeholder-card.webp"}
                      alt={playerCard.name}
                      className="max-w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/imagenes/placeholder-card.webp";
                      }}
                    />
                    <p className="text-white text-sm mt-2">{playerCard.name}</p>
                    <p className="text-gray-400 text-xs">
                      ATK: {displayStat(playerCard.atk)}
                    </p>
                    <p className="text-gray-400 text-xs">
                      DEF: {displayStat(playerCard.def)}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400">Selecciona una carta</p>
                )}
              </div>
            </div>

            {/* CPU */}
            <div className="text-center">
              <h2 className="text-white text-xl font-bold">CPU</h2>
              <p className="text-white">Vida: {cpuLife}</p>
              <div className="w-[150px] bg-gray-700 flex flex-col items-center justify-start rounded-md mx-auto mt-2 p-2">
                {cpuCard ? (
                  <>
                    <img
                      src={cpuCard.image_url || "/imagenes/placeholder-card.webp"}
                      alt={cpuCard.name}
                      className="max-w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/imagenes/placeholder-card.webp";
                      }}
                    />
                    <p className="text-white text-sm mt-2">{cpuCard.name}</p>
                    <p className="text-gray-400 text-xs">
                      ATK: {displayStat(cpuCard.atk)}
                    </p>
                    <p className="text-gray-400 text-xs">
                      DEF: {displayStat(cpuCard.def)}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400">Esperando...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mano de cartas del jugador */}
        <div className="w-full lg:w-[300px]">
          <h2 className="text-white text-xl font-bold mb-4">
            Tus Cartas
            {!useInventoryCards && (
              <span className="text-xs text-yellow-400 ml-2">
                (Incluye cartas de muestra)
              </span>
            )}
          </h2>
          {playerHand.length > 0 ? (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] p-2">
              {playerHand.map((card, index) => (
                <div
                  key={index}
                  className={`bg-gray-800 flex flex-col items-center justify-center 
                    rounded-md p-2 cursor-pointer hover:bg-gray-700 
                    ${winner ? "pointer-events-none opacity-50" : ""}`}
                  onClick={() => handleTurn(card)}
                >
                  <img
                    src={card.image_url || "/imagenes/placeholder-card.webp"}
                    alt={card.name}
                    className="w-full h-[120px] object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/imagenes/placeholder-card.webp";
                    }}
                  />
                  <p className="text-white text-sm mt-1">{card.name}</p>
                  <p className="text-gray-400 text-xs">
                    ATK: {displayStat(card.atk)}
                  </p>
                  <p className="text-gray-400 text-xs">
                    DEF: {displayStat(card.def)}
                  </p>
                  <button
                    className="mt-2 bg-blue-600 text-white px-2 py-1 text-xs rounded"
                    disabled={!!winner}
                  >
                    Seleccionar
                  </button>
                </div>
              ))}
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
