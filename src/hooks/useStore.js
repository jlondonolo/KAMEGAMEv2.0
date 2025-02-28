import { useState, useEffect, useCallback } from 'react';

export const useStore = () => {
    const [cards, setCards] = useState([]); // Cartas originales del JSON
    const [filteredCards, setFilteredCards] = useState([]); // Cartas filtradas para la tienda
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 9;

    const fetchCards = async () => {
        try {
            const response = await fetch("/imagenes/yu_gi_oh_detailed_cards.json");
            if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");

            const data = await response.json();
            const allCards = Object.values(data).flat();

            setCards(allCards);
            localStorage.setItem("allCards", JSON.stringify(allCards)); // 🔥 Guardamos las cartas en localStorage
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const [filters, setFilters] = useState({
        name: '',
        attribute: '',
        level: '',
        subtype: '',
        priceRange: '',
        sortOrder: 'default'
    });

    const calculatePrice = useCallback((card) => {
        if (card.level <= 3) return 100;
        if (card.level <= 5) return 200;
        if (card.level <= 8) return 300;
        return 1000;
    }, []);

    const applyFilters = useCallback(() => {
        let result = [...cards];

        if (filters.name) {
            result = result.filter(card =>
                card.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        if (filters.attribute) {
            result = result.filter(card =>
                card.attribute?.toLowerCase() === filters.attribute.toLowerCase()
            );
        }

        if (filters.level) {
            result = result.filter(card => {
                const level = card.level;
                switch (filters.level) {
                    case '1-3': return level >= 1 && level <= 3;
                    case '4-5': return level >= 4 && level <= 5;
                    case '6-8': return level >= 6 && level <= 8;
                    case '10+': return level >= 10;
                    default: return true;
                }
            });
        }

        if (filters.subtype) {
            result = result.filter(card =>
                card.race?.toLowerCase() === filters.subtype.toLowerCase()
            );
        }

        if (filters.priceRange) {
            result = result.filter(card => {
                const price = calculatePrice(card);
                switch (filters.priceRange) {
                    case '0-100': return price <= 100;
                    case '101-200': return price > 100 && price <= 200;
                    case '201-300': return price > 200 && price <= 300;
                    case '301-999': return price > 300 && price < 1000;
                    case '1000': return price === 1000;
                    default: return true;
                }
            });
        }

        if (filters.sortOrder !== 'default') {
            result.sort((a, b) => {
                const priceA = calculatePrice(a);
                const priceB = calculatePrice(b);
                return filters.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            });
        } else {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredCards(result);
        setCurrentPage(1);
    }, [cards, filters, calculatePrice]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const updateFilter = useCallback((key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    const getPaginatedCards = useCallback(() => {
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const endIndex = startIndex + CARDS_PER_PAGE;
        return filteredCards.slice(startIndex, endIndex);
    }, [currentPage, filteredCards]);

    const getTotalPages = useCallback(() =>
        Math.ceil(filteredCards.length / CARDS_PER_PAGE),
        [filteredCards]
    );

    // 🔥 Función para comprar paquetes y obtener cartas aleatorias
    const buyPackage = (packageType, addToInventory) => {
        let minLevel, maxLevel;

        switch (packageType) {
            case "basic":
                minLevel = 1;
                maxLevel = 3;
                break;
            case "medium":
                minLevel = 4;
                maxLevel = 5;
                break;
            case "premium":
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

        newCards.forEach(card => addToInventory(card));

        alert(`¡Paquete ${packageType} comprado! Revisa tu inventario.`);
    };

    return {
        cards: getPaginatedCards(),
        loading,
        error,
        filters,
        currentPage,
        totalPages: getTotalPages(),
        updateFilter,
        setCurrentPage,
        calculatePrice,
        totalCards: filteredCards.length,
        buyPackage
    };
};

// 🔥 Función para obtener cartas aleatorias dentro de un rango de niveles
export const getRandomCardsByLevel = (allCards, minLevel, maxLevel, quantity = 3) => {
    if (!allCards || allCards.length === 0) {
        console.error("❌ No hay cartas disponibles.");
        return [];
    }

    const filteredCards = allCards.filter(card =>
        card.level >= minLevel && card.level <= maxLevel
    );

    if (filteredCards.length === 0) {
        console.error("❌ No hay cartas en el rango de niveles especificado.");
        return [];
    }

    const shuffled = filteredCards.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, quantity);
};
