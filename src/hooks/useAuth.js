// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Verificar autenticación al iniciar
    useEffect(() => {
        checkAuth();
        setIsInitialized(true);
    }, []);

    // Función para verificar autenticación
    const checkAuth = () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
            return true;
        }
        return false;
    };

    const login = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            setUser(user);
            return true;
        }
        return false;
    };

    const register = (username, password, country, avatar) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.find(u => u.username === username)) {
            return false;
        }

        const newUser = {
            username,
            password,
            country,
            avatar,
            xp: 0
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    };

    const logout = () => {
        localStorage.removeItem('loggedInUser');
        setUser(null);
    };

    // Verificar si el usuario está autenticado
    const isAuthenticated = () => {
        return !!user;
    };

    return {
        user,
        login,
        register,
        logout,
        checkAuth,
        isAuthenticated,
        isInitialized
    };
};