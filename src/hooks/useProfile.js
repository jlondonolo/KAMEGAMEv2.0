// src/hooks/useProfile.js
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth.js';

export const useProfile = () => {
    const { user, logout } = useAuth();
    const [favoriteCards, setFavoriteCards] = useState([]);
    const [userLevel, setUserLevel] = useState({ level: 'Novato', progress: 80 });

    useEffect(() => {
        if (user) {
            // Cargar favoritos del localStorage
            const savedFavorites = localStorage.getItem(`favorites_${user.username}`);
            if (savedFavorites) {
                setFavoriteCards(JSON.parse(savedFavorites));
            }

            // Calcular nivel basado en XP
            calculateLevel(user.xp);
        }
    }, [user]);

    const calculateLevel = (xp) => {
        const levels = {
            0: 'Novato',
            1000: 'Principiante',
            2000: 'Intermedio',
            3000: 'Avanzado',
            4000: 'Experto',
            5000: 'Maestro'
        };

        let currentLevel = 'Novato';
        let progress = 0;

        const xpLevels = Object.keys(levels).map(Number);
        for (let i = 0; i < xpLevels.length; i++) {
            if (xp >= xpLevels[i]) {
                currentLevel = levels[xpLevels[i]];
                const nextLevel = xpLevels[i + 1] || xpLevels[i];
                const prevLevel = xpLevels[i];
                progress = ((xp - prevLevel) / (nextLevel - prevLevel)) * 100;
            }
        }

        setUserLevel({ level: currentLevel, progress });
    };

    const addFavorite = (card) => {
        const newFavorites = [...favoriteCards, card];
        setFavoriteCards(newFavorites);
        localStorage.setItem(`favorites_${user.username}`, JSON.stringify(newFavorites));
    };

    const removeFavorite = (cardName) => {
        const newFavorites = favoriteCards.filter(card => card.name !== cardName);
        setFavoriteCards(newFavorites);
        localStorage.setItem(`favorites_${user.username}`, JSON.stringify(newFavorites));
    };

    return {
        user,
        favoriteCards,
        userLevel,
        addFavorite,
        removeFavorite,
        logout
    };
};
