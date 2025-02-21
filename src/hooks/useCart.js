// src/hooks/useCart.js
import { useState, useEffect } from 'react';

export const useCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const saveCart = (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    };

    const addToCart = (item) => {
        const existingItem = cart.find(i => i.name === item.name);
        if (existingItem) {
            const newCart = cart.map(i =>
                i.name === item.name
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            );
            saveCart(newCart);
        } else {
            saveCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        saveCart(newCart);
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        const newCart = cart.map((item, i) =>
            i === index ? { ...item, quantity: newQuantity } : item
        );
        saveCart(newCart);
    };

    const clearCart = () => {
        saveCart([]);
    };

    const getTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal
    };
};