import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomCardsByLevel } from "./useStore";

export const useInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recentlyReceived, setRecentlyReceived] = useState([]);
    const [allCards, setAllCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Usamos useRef para mantener la base de datos de cartas en memoria en lugar de useState
    // Esto evita renderizados innecesarios cuando cambia cardDatabase
    const cardDatabaseRef = useRef({});

    // Variable para verificar si ya cargamos las cartas (evita múltiples cargas)
    const cardsLoadedRef = useRef(false);

    // Guardar el inventario en localStorage
    const saveInventory = useCallback((newInventory) => {
        setInventory(newInventory);
        localStorage.setItem("inventory", JSON.stringify(newInventory));
    }, []);

    // Función para cargar las cartas desde el archivo JSON y crear índice
    const fetchAllCards = useCallback(async () => {
        // Si ya cargamos cartas y tenemos datos, no recargamos
        if (cardsLoadedRef.current && Object.keys(cardDatabaseRef.current).length > 0) {
            console.log("Usando cardDatabase en memoria");
            return;
        }

        try {
            setIsLoading(true);
            console.log("Cargando cartas desde JSON...");

            // Cargamos desde el JSON
            const response = await fetch("/imagenes/yu_gi_oh_detailed_cards.json");
            if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");

            const data = await response.json();
            let cards = Object.values(data).flat();

            // Definir claves obligatorias con valores por defecto
            const defaultCard = {
                archetype: "Unknown",
                atk: 0,
                attribute: "Unknown",
                def: 0,
                desc: "No description available.",
                image_url: "",
                level: 0,
                name: "Unknown",
                race: "Unknown",
                type: "Unknown"
            };

            // Normalizar todas las cartas para asegurarnos de que tienen las mismas claves
            // y filtrar solo cartas con atk Y def definidos
            cards = cards
                .filter(card =>
                    card.atk !== undefined &&
                    card.atk !== null &&
                    card.def !== undefined &&
                    card.def !== null)
                .map(card => ({
                    ...defaultCard,
                    ...card,
                    image_url: card.image || card.image_url || "/imagenes/placeholder-card.webp"
                }));

            // Filtrar adicionalmente para paquetes (por nivel)
            const cardsForPackages = cards.filter(card =>
                card.level !== undefined &&
                card.level !== null
            );

            // Crear una base de datos de cartas indexada por nombre para búsquedas rápidas
            const cardDB = {};
            cards.forEach(card => {
                if (card.name) {
                    // Solo agregamos cartas con ATK y DEF al índice
                    cardDB[card.name.toLowerCase()] = card;
                }
            });

            console.log(`Cargadas ${cards.length} cartas válidas con ATK y DEF definidos`);
            console.log(`${cardsForPackages.length} cartas disponibles para paquetes con nivel definido`);

            // Guardar en variables de referencia para evitar re-renders
            cardDatabaseRef.current = cardDB;
            setAllCards(cardsForPackages);
            cardsLoadedRef.current = true;

            return cards;
        } catch (error) {
            console.error("Error al cargar las cartas:", error.message);
            alert("No se pudieron cargar las cartas. Por favor, intenta de nuevo más tarde.");
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Función para enriquecer el inventario con datos completos de las cartas
    const enrichInventoryWithCardData = useCallback((inventoryItems) => {
        // Para evitar procesamiento innecesario
        if (!inventoryItems || inventoryItems.length === 0 || Object.keys(cardDatabaseRef.current).length === 0) {
            return inventoryItems || [];
        }

        return inventoryItems.map(item => {
            // Si el item es un paquete, lo dejamos como está
            if (item.name && (
                item.name === "Paquete Básico" ||
                item.name === "Paquete Medio" ||
                item.name === "Paquete Premium"
            )) {
                return {
                    ...item,
                    type: "package" // Aseguramos que tenga el tipo "package"
                };
            }

            // Para cartas, buscamos información adicional en la base de datos
            if (item.name) {
                const cardInfo = cardDatabaseRef.current[item.name.toLowerCase()];
                if (cardInfo) {
                    return { ...item, ...cardInfo };
                }
            }

            return item;
        });
    }, []);

    // Cargar el inventario desde localStorage
    useEffect(() => {
        const loadInventory = async () => {
            const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
            console.log("Inventario recuperado de localStorage:", savedInventory);

            // Si el inventario está vacío, no hacemos nada más
            if (savedInventory.length === 0) {
                setInventory([]);
                return;
            }

            // Primero cargamos todas las cartas para tener la base de datos
            await fetchAllCards();

            // Una vez que tenemos la base de datos de cartas, enriquecemos el inventario
            if (Object.keys(cardDatabaseRef.current).length > 0) {
                const enrichedInventory = enrichInventoryWithCardData(savedInventory);
                setInventory(enrichedInventory);
            } else {
                // Si no pudimos cargar la base de datos, usamos el inventario tal cual
                setInventory(savedInventory);
            }
        };

        loadInventory();
    }, [fetchAllCards, enrichInventoryWithCardData]);

    // Agregar un item al inventario con información completa
    const addToInventory = useCallback((item) => {
        // Verificamos si ya existe un item con el mismo ID o nombre
        const existingItemIndex = inventory.findIndex(i =>
            (i.id && i.id === item.id) ||
            (i.name && item.name && i.name === item.name)
        );

        if (existingItemIndex !== -1) {
            console.log(`Item ${item.name || item.id} ya existe en el inventario`);
            return;
        }

        // Enriquecer el item con información completa si es una carta
        let enrichedItem = item;
        if (item.name && cardDatabaseRef.current[item.name.toLowerCase()]) {
            enrichedItem = { ...item, ...cardDatabaseRef.current[item.name.toLowerCase()] };
        }

        // Si es un paquete, aseguramos que tenga el tipo "package"
        if (item.name && (
            item.name === "Paquete Básico" ||
            item.name === "Paquete Medio" ||
            item.name === "Paquete Premium"
        )) {
            enrichedItem = { ...enrichedItem, type: "package" };
        }

        const updatedInventory = [...inventory, enrichedItem];
        saveInventory(updatedInventory);
        console.log(`Item añadido al inventario: ${item.name || item.id}`);
    }, [inventory, saveInventory]);

    // Remover un item del inventario por su nombre o ID
    const removeFromInventory = useCallback((identifier) => {
        const updatedInventory = inventory.filter(item =>
            item.name !== identifier && item.id !== identifier
        );
        saveInventory(updatedInventory);
        console.log(`Item removido del inventario: ${identifier}`);
    }, [inventory, saveInventory]);

    // Función para abrir paquetes
    const openPackage = useCallback((packageItem) => {
        // Verificar si el paquete está en el inventario
        const packageExists = inventory.some(item => item.name === packageItem.name);
        if (!packageExists) {
            alert(`No tienes un ${packageItem.name} en tu inventario.`);
            return;
        }

        // Determinar el rango de niveles según el tipo de paquete
        let minLevel, maxLevel, quantity;
        switch (packageItem.name) {
            case "Paquete Básico":
                minLevel = 1;
                maxLevel = 3;
                quantity = 3; // 3 cartas por paquete básico
                break;
            case "Paquete Medio":
                minLevel = 4;
                maxLevel = 5;
                quantity = 3; // 3 cartas por paquete medio
                break;
            case "Paquete Premium":
                minLevel = 6;
                maxLevel = 8;
                quantity = 3; // 3 cartas por paquete premium
                break;
            default:
                alert("Tipo de paquete desconocido.");
                return;
        }

        // Verificar si hay cartas cargadas
        if (allCards.length === 0) {
            alert("No hay cartas disponibles. Intentando cargar de nuevo...");
            fetchAllCards().then(() => {
                if (allCards.length > 0) {
                    // Reintentar la operación si se logran cargar las cartas
                    openPackage(packageItem);
                }
            });
            return;
        }

        try {
            // Obtener cartas aleatorias del rango de nivel especificado
            const newCards = getRandomCardsByLevel(allCards, minLevel, maxLevel, quantity);

            if (newCards.length === 0) {
                alert(`No hay suficientes cartas de nivel ${minLevel}-${maxLevel} disponibles.`);
                return;
            }

            // Añadir las cartas obtenidas al inventario
            const updatedInventory = [...inventory];

            // Remover el paquete del inventario
            const packageIndex = updatedInventory.findIndex(item => item.name === packageItem.name);
            if (packageIndex !== -1) {
                updatedInventory.splice(packageIndex, 1);
            }

            // Añadir las nuevas cartas tal como vienen del JSON
            const finalInventory = [...updatedInventory, ...newCards];

            // Guardar el inventario actualizado
            saveInventory(finalInventory);

            // Guardar las cartas recibidas para mostrarlas
            setRecentlyReceived(newCards);

            // Mostrar mensaje al usuario
            alert(`¡Has abierto un ${packageItem.name} y recibido ${newCards.length} cartas!`);

            // Útil para debugging
            console.log("Cartas recibidas:", newCards);

            return newCards; // Retornar las cartas para posible uso externo
        } catch (error) {
            console.error("Error al abrir el paquete:", error);
            alert("Ocurrió un error al abrir el paquete. Por favor, intenta de nuevo.");
            return [];
        }
    }, [inventory, allCards, fetchAllCards, saveInventory]);

    // Buscar información completa de una carta por nombre
    const findCardByName = useCallback((cardName) => {
        if (!cardName) return null;
        return cardDatabaseRef.current[cardName.toLowerCase()] || null;
    }, []);

    // Filtrar el inventario según el término de búsqueda
    const filteredInventory = inventory.filter(item => {
        if (!searchTerm) return true;

        // Buscar por nombre, tipo, atributo, etc.
        return (
            (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.type && item.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.attribute && item.attribute.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.race && item.race.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.desc && item.desc.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return {
        inventory: filteredInventory, // Inventario filtrado por búsqueda
        rawInventory: inventory, // Inventario completo sin filtrar
        addToInventory,
        removeFromInventory,
        openPackage,
        recentlyReceived,
        searchTerm,
        setSearchTerm,
        isLoading,
        refreshCards: fetchAllCards,
        findCardByName, // Función para buscar información de cartas
        enrichInventoryWithCardData, // Función para enriquecer datos existentes
        // Exponemos función para obtener info de cartas desde fuera si es necesario
        getCardInfo: (cardName) => cardName ? cardDatabaseRef.current[cardName.toLowerCase()] : null
    };
};