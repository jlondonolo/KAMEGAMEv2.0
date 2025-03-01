import { useState, useEffect } from "react";
import { getRandomCardsByLevel } from "./useStore"; // 🔥 Asegúrate de que esta función retorne el objeto completo

export const useInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recentlyReceived, setRecentlyReceived] = useState([]);

    useEffect(() => {
        const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
        console.log("Inventario recuperado de localStorage:", savedInventory);
        setInventory(savedInventory);
    }, []);

    const saveInventory = (newInventory) => {
        setInventory(newInventory);
        localStorage.setItem("inventory", JSON.stringify(newInventory));
    };

    // Agrega el objeto completo de la carta al inventario
    const addToInventory = (item) => {
        const updatedInventory = [...inventory, item];
        saveInventory(updatedInventory);
    };

    // Remueve el paquete (identificado por su nombre) del inventario
    const removeFromInventory = (itemName) => {
        const updatedInventory = inventory.filter(item => item.name !== itemName);
        saveInventory(updatedInventory);
    };

    // Función para abrir paquetes y obtener cartas del JSON
    const openPackage = (packageItem) => {
        let minLevel, maxLevel;
        switch (packageItem.name) {
            case "Paquete Básico":
                minLevel = 1;
                maxLevel = 3;
                break;
            case "Paquete Medio":
                minLevel = 4;
                maxLevel = 5;
                break;
            case "Paquete Premium":
                minLevel = 6;
                maxLevel = 8;
                break;
            default:
                return;
        }

        const allCards = JSON.parse(localStorage.getItem("allCards")) || [];
        if (allCards.length === 0) {
            alert("No hay cartas disponibles en el sistema.");
            return;
        }

        // getRandomCardsByLevel debe retornar los objetos completos de las cartas
        const newCards = getRandomCardsByLevel(allCards, minLevel, maxLevel);
        if (newCards.length === 0) {
            alert("No hay suficientes cartas en este rango de nivel.");
            return;
        }

        // Agregar las cartas completas al inventario y guardarlas
        const updatedInventory = [...inventory, ...newCards];
        saveInventory(updatedInventory);

        // Guardar las cartas recibidas para mostrarlas en pantalla (si es necesario)
        setRecentlyReceived(newCards);

        // Eliminar el paquete del inventario (si el paquete se guardó previamente)
        removeFromInventory(packageItem.name);

        alert(`¡Has abierto un ${packageItem.name} y recibido ${newCards.length} cartas!`);
    };

    return {
        inventory,
        addToInventory,
        openPackage,
        recentlyReceived,
        searchTerm,
        setSearchTerm,
        removeFromInventory,
    };
};
