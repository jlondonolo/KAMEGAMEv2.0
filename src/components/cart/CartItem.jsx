// src/components/cart/CartItem.jsx
import React from 'react';

const CartItem = ({ item, index, onUpdateQuantity, onRemove }) => {
    return (
        <div className="flex items-center border-b border-gray-700 py-4">
            <img
                src={item.image}
                alt={item.name}
                className="w-16 mr-4 rounded"
            />
            <div className="flex-grow">
                <p className="text-white font-bold">{item.name}</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#1e1e2f] rounded">
                    <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-3 py-1 text-white hover:bg-[#2e04c5] rounded-l"
                    >
                        -
                    </button>
                    <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-12 text-center bg-transparent text-white"
                    />
                    <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-3 py-1 text-white hover:bg-[#2e04c5] rounded-r"
                    >
                        +
                    </button>
                </div>
                <p className="text-[#007bff] font-bold w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                    onClick={() => onRemove(index)}
                    className="bg-[#ff4d4d] text-white px-3 py-1 rounded hover:bg-[#ff6666]"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default CartItem;