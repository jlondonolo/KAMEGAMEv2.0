import { useState, useEffect } from "react";
import { getRandomCardsByLevel } from "./useStore";

export const useInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recentlyReceived, setRecentlyReceived] = useState([]);
    const [allCards, setAllCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Cargar el inventario desde localStorage
    useEffect(() => {
        const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
        console.log("Inventario recuperado de localStorage:", savedInventory);
        setInventory(savedInventory);

        // Cargar todas las cartas para tenerlas disponibles al abrir paquetes
        fetchAllCards();
    }, []);

    // Función para cargar las cartas desde el archivo JSON
    const fetchAllCards = async () => {
        try {
            setIsLoading(true);
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
            cards = cards.map(card => ({
                ...defaultCard,
                ...card,
                image_url: card.image || card.image_url || "https://via.placeholder.com/150"
            }));

            // Filtrar para incluir solo cartas que tengan nivel definido
            cards = cards.filter(card => card.level !== undefined && card.level !== null);

            setAllCards(cards);
            console.log(`Cargadas ${cards.length} cartas para posibles paquetes`);
        } catch (error) {
            console.error("Error al cargar las cartas:", error.message);
            alert("No se pudieron cargar las cartas. Por favor, intenta de nuevo más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    // Guardar el inventario en localStorage
    const saveInventory = (newInventory) => {
        setInventory(newInventory);
        localStorage.setItem("inventory", JSON.stringify(newInventory));
    };

    // Agregar un item al inventario
    const addToInventory = (item) => {
        // Verificamos si ya existe un item con el mismo ID (para evitar duplicados)
        const existingItemIndex = inventory.findIndex(i => i.id === item.id);

        if (existingItemIndex !== -1) {
            // Si es un item acumulable (como monedas), podríamos sumar cantidades
            // Por ahora, simplemente evitamos duplicados
            console.log(`Item ${item.name || item.id} ya existe en el inventario`);
            return;
        }

        const updatedInventory = [...inventory, item];
        saveInventory(updatedInventory);
        console.log(`Item añadido al inventario: ${item.name || item.id}`);
    };

    // Remover un item del inventario por su nombre o ID
    const removeFromInventory = (identifier) => {
        const updatedInventory = inventory.filter(item =>
            item.name !== identifier && item.id !== identifier
        );
        saveInventory(updatedInventory);
        console.log(`Item removido del inventario: ${identifier}`);
    };

    // Función para abrir paquetes
    const openPackage = (packageItem) => {
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
    };

    // Filtrar el inventario según el término de búsqueda
    const filteredInventory = inventory.filter(item => {
        if (!searchTerm) return true;

        // Buscar por nombre, tipo, atributo, etc.
        return (
            (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.type && item.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.attribute && item.attribute.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
        refreshCards: fetchAllCards
    };
};