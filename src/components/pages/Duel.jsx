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

        // Solo procesamos si hay cartas de este nivel
        if (cardsOfLevel.length > 0) {
          const sample = cardsOfLevel
              .sort(() => 0.5 - Math.random()) // Mezclar aleatoriamente
              .slice(0, sampleSize);          // Tomar las primeras 10 (o menos)
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

    // Si no pudimos obtener cartas, devolvemos un array vacío
    console.log("No se pudieron cargar cartas de muestra, devolviendo array vacío");
    return [];
  } catch (error) {
    console.error("Error al cargar cartas de muestra:", error);
    return [];
  }
};

const Duel = () => {
  // Usamos el hook useInventory para acceder directamente al inventario
  const { inventory, rawInventory } = useInventory();

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
  const [finalGif, setFinalGif] = useState(null);         // Ruta del GIF final
  const [showFinalGif, setShowFinalGif] = useState(false); // Overlay de GIF final

  // Estados para el origen de las cartas y cartas de muestra
  const [useInventoryCards, setUseInventoryCards] = useState(true);
  const [sampleCards, setSampleCards] = useState([]);

  // Al cargar el inventario, decidimos qué fuente de cartas usar
  useEffect(() => {
    // Evitamos procesamiento innecesario si el inventario está vacío
    if (inventory.length === 0) return;

    // Filtramos para incluir solo las cartas válidas del inventario (no los paquetes)
    const validCards = inventory.filter(item =>
        item.type !== "package" &&
        !item.name?.includes("Paquete") &&
        // Nos aseguramos de que tenga valores de ataque y defensa (o al menos sean 0)
        (item.atk !== undefined && item.def !== undefined)
    );

    // Si hay al menos 10 cartas válidas en el inventario, las usamos
    if (validCards.length >= 10) {
      console.log("Usando cartas del inventario:", validCards.length);
      setPlayerHand(validCards);
      setUseInventoryCards(true);
    } else {
      // Si no hay suficientes cartas en el inventario, cargamos las de muestra
      console.log("No hay suficientes cartas en inventario, cargando cartas de muestra...");
      const samples = getSampleCards();
      setSampleCards(samples);
      setPlayerHand([...validCards, ...samples]);
      setUseInventoryCards(false);
    }
  }, [inventory.length]); // Solo se ejecuta cuando cambia el tamaño del inventario

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
    const timer = setTimeout(() => {
      setShowFinalGif(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [winner]);

  // Manejo del turno cuando el jugador selecciona una carta
  const handleTurn = (selectedCard) => {
    if (winner) return; // No hacemos nada si ya hay ganador

    // Usamos la carta tal cual viene del inventario o de las cartas de muestra
    setPlayerCard(selectedCard);

    // Seleccionamos una carta aleatoria para la CPU
    let cpuCardPool = [];

    // Si estamos usando el inventario, usamos esas cartas para la CPU
    if (useInventoryCards) {
      cpuCardPool = playerHand.filter(card =>
          card.atk !== undefined && card.def !== undefined
      );
    }
    // Si no, combinamos cartas del inventario (si hay) con las cartas de muestra
    else {
      // Usamos todas las cartas disponibles (inventario + muestra)
      cpuCardPool = [...playerHand].filter(card =>
          card.atk !== undefined && card.def !== undefined
      );

      // Si hay pocas, aseguramos que haya algunas cartas de muestra
      if (cpuCardPool.length < 5 && sampleCards.length > 0) {
        cpuCardPool = sampleCards.filter(card =>
            card.atk !== undefined && card.def !== undefined
        );
      }
    }

    // Carta por defecto en caso de que no haya disponibles
    const defaultCpuCard = {
      name: "Carta CPU",
      atk: 1000,
      def: 1000,
      image_url: "/imagenes/placeholder-card.webp",
    };

    // Seleccionamos carta aleatoria o usamos la default si no hay disponibles
    const randomCpuCard = cpuCardPool.length > 0
        ? {...cpuCardPool[Math.floor(Math.random() * cpuCardPool.length)]}
        : defaultCpuCard;

    setCpuCard(randomCpuCard);

    // Calculamos el daño
    const damageToCpu = calcularDanio(selectedCard.atk || 0, randomCpuCard.def || 0);
    const damageToPlayer = calcularDanio(randomCpuCard.atk || 0, selectedCard.def || 0);

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
                            src={playerCard.image_url || "/imagenes/placeholder-card.webp"}
                            alt={playerCard.name}
                            className="max-w-full h-auto object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/imagenes/placeholder-card.webp";
                            }}
                        />
                        <p className="text-white text-sm">{playerCard.name}</p>
                        <p className="text-gray-400 text-xs">
                          ATK: {displayStat(playerCard.atk)}
                        </p>
                        <p className="text-gray-400 text-xs">
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
                            src={cpuCard.image_url || "/imagenes/placeholder-card.webp"}
                            alt={cpuCard.name}
                            className="w-full max-w-xs h-auto object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/imagenes/placeholder-card.webp";
                            }}
                        />
                        <p className="text-white text-sm">{cpuCard.name}</p>
                        <p className="text-gray-400 text-xs">
                          ATK: {displayStat(cpuCard.atk)}
                        </p>
                        <p className="text-gray-400 text-xs">
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