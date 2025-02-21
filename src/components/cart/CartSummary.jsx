// src/components/cart/CartSummary.jsx
import React from 'react';

const CartSummary = ({ items, total, onBuy }) => {
    return (
        <div className="bg-[#1e1e2f] p-6 rounded-lg">
            <h2 className="text-white text-xl font-bold mb-4">Resumen de compra</h2>
            <ul className="space-y-2 mb-4">
                {items.map((item, index) => (
                    <li key={index} className="text-white">
                        {item.name} (x{item.quantity}) - ${(item.price * item.quantity).toFixed(2)}
                    </li>
                ))}
            </ul>
            <p className="text-xl text-white font-bold mb-4">
                Total: ${total.toFixed(2)}
            </p>
            <button
                onClick={onBuy}
                className="w-full bg-[#007bff] text-white py-2 rounded hover:bg-[#0056b3] transition-colors"
            >
                Comprar todo
            </button>
        </div>
    );
};


export default CartSummary;