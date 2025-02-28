import { useState, useEffect } from "react";
import { getRandomCardsByLevel } from "./useStore"; // 🔥 Importamos correctamente la función

export const useInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recentlyReceived, setRecentlyReceived] = useState([]);

    useEffect(() => {
        const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
        setInventory(savedInventory);
    }, []);

    const saveInventory = (newInventory) => {
        setInventory(newInventory);
        localStorage.setItem("inventory", JSON.stringify(newInventory));
    };

    const addToInventory = (item) => {
        const updatedInventory = [...inventory, item];
        saveInventory(updatedInventory);
    };

    const removeFromInventory = (itemName) => {
        const updatedInventory = inventory.filter(item => item.name !== itemName);
        saveInventory(updatedInventory);
    };

    // 🔥 Función para abrir paquetes y obtener cartas del JSON
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

        const newCards = getRandomCardsByLevel(allCards, minLevel, maxLevel);
        if (newCards.length === 0) {
            alert("No hay suficientes cartas en este rango de nivel.");
            return;
        }

        // 🔥 Agregar cartas al inventario y guardar en localStorage
        const updatedInventory = [...inventory, ...newCards];
        saveInventory(updatedInventory);

        // 🔥 Guardar las cartas recibidas para mostrar en pantalla
        setRecentlyReceived(newCards);

        // 🔥 Eliminar el paquete del inventario
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
