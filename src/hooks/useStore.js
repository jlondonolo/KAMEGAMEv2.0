import { useState, useEffect, useCallback } from 'react';

export const useStore = () => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 9;

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

        // Filtro por nombre
        if (filters.name) {
            result = result.filter(card =>
                card.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        // Filtro por atributo
        if (filters.attribute) {
            result = result.filter(card =>
                card.attribute?.toLowerCase() === filters.attribute.toLowerCase()
            );
        }

        // Filtro por nivel
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

        // Filtro por subtipo
        if (filters.subtype) {
            result = result.filter(card =>
                card.race?.toLowerCase() === filters.subtype.toLowerCase()
            );
        }

        // Filtro por rango de precio
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

        // Ordenamiento
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

    const fetchCards = async () => {
        try {
            const response = await fetch('yu_gi_oh_detailed_cards.json');
            if (!response.ok) throw new Error('Error cargando las cartas');

            const data = await response.json();
            const effectMonsters = data['Effect Monster'] || [];

            // Filtrar solo las cartas que tienen nivel
            const cardsWithLevel = effectMonsters.filter(card => {
                return card.level !== undefined &&
                    card.level !== null &&
                    !isNaN(Number(card.level)) &&
                    Number(card.level) > 0;
            });

            setCards(cardsWithLevel);
            setFilteredCards(cardsWithLevel);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

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
        totalCards: filteredCards.length
    };
};