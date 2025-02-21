// src/components/inventory/InventoryCard.jsx
import React from 'react';

const InventoryCard = ({ item }) => {
    return (
        <div className="bg-[#282a36] p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain mb-4 rounded"
            />
            <h2 className="text-lg text-white font-semibold mb-2 text-center">
                {item.name}
            </h2>
            <p className="text-gray-400 text-center">
                Cantidad: {item.quantity}
            </p>
        </div>
    );
};

export default InventoryCard;