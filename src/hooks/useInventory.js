// src/hooks/useInventory.js
import { useState, useEffect } from 'react';

export const useInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const savedInventory = localStorage.getItem('inventory');
        if (savedInventory) {
            const parsed = JSON.parse(savedInventory);
            setInventory(parsed);
            setFilteredInventory(parsed);
        }
    }, []);

    const filterInventory = (term) => {
        setSearchTerm(term);
        if (!term.trim()) {
            setFilteredInventory(inventory);
            return;
        }

        const filtered = inventory.filter(item =>
            item.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredInventory(filtered);
    };

    const addToInventory = (card) => {
        const newInventory = [...inventory];
        const existingItem = newInventory.find(i => i.name === card.name);

        if (existingItem) {
            existingItem.quantity += card.quantity;
        } else {
            newInventory.push({ 
                ...card, // Copia todos los datos de la carta original
            });
        }

        localStorage.setItem('inventory', JSON.stringify(newInventory));
        setInventory(newInventory);
    };
    

    const removeFromInventory = (itemName) => {
        const newInventory = inventory.filter(item => item.name !== itemName);
        localStorage.setItem('inventory', JSON.stringify(newInventory));
        setInventory(newInventory);
        filterInventory(searchTerm);
    };

    return {
        inventory: filteredInventory,
        searchTerm,
        filterInventory,
        addToInventory,
        removeFromInventory
    };
};