// src/hooks/useCart.js
import { useState, useEffect } from "react";

// Función auxiliar para obtener la carta solo con los atributos necesarios
const getCompleteCard = (card) => {
    const allCards = JSON.parse(localStorage.getItem("allCards")) || [];
    const completeCard = allCards.find((c) => c.name === card.name);

    if (completeCard) {
        // Only return the specified attributes
        return {
            name: card.name || completeCard.name,
            image: card.image || completeCard.image || "https://images.ygoprodeck.com/images/cards/89718302.jpg",
            image_url: card.image_url || card.image || completeCard.image_url || completeCard.image || "https://images.ygoprodeck.com/images/cards/89718302.jpg",
            price: card.price || completeCard.price || 0,
            quantity: card.quantity || 1
        };
    } else {
        // If card not found in allCards, use provided card with defaults
        return {
            name: card.name,
            image: card.image || "https://images.ygoprodeck.com/images/cards/89718302.jpg",
            image_url: card.image_url || card.image || "https://images.ygoprodeck.com/images/cards/89718302.jpg",
            price: card.price || 0,
            quantity: card.quantity || 1
        };
    }
};

export const useCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Aseguramos que cada carta en el carrito tenga información completa
                const completedCart = parsedCart.map(item => getCompleteCard(item));
                setCart(completedCart);
            } catch (error) {
                console.error("Error al cargar el carrito:", error);
                setCart([]);
            }
        }
    }, []);

    const saveCart = (newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    };

    const addToCart = (card) => {
        const completeCard = getCompleteCard(card);
        console.log("Agregando carta al carrito:", completeCard);

        const existingItem = cart.find((i) => i.name === completeCard.name);
        if (existingItem) {
            const newCart = cart.map((i) =>
                i.name === completeCard.name
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            );
            saveCart(newCart);
        } else {
            saveCart([
                ...cart,
                {
                    ...completeCard,
                    quantity: 1,
                },
            ]);
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
        return cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            return sum + price * item.quantity;
        }, 0);
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
    };
};