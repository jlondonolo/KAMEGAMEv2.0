// src/components/cart/RelatedProducts.jsx
import React from 'react';

const RelatedProducts = () => {
    const relatedItems = [
        {
            image: "https://images.ygoprodeck.com/images/cards/31247589.jpg",
            name: "Producto 1"
        },
        {
            image: "https://images.ygoprodeck.com/images/cards/2067935.jpg",
            name: "Producto 2"
        },
        {
            image: "https://images.ygoprodeck.com/images/cards/66403530.jpg",
            name: "Producto 3"
        }
    ];

    return (
        <div className="mt-8">
            <h2 className="text-white text-xl font-bold mb-4">También te podría interesar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedItems.map((item, index) => (
                    <div key={index} className="text-center">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full rounded mb-2"
                        />
                        <p className="text-white">{item.name}</p>
                        <p className="text-gray-400">Descripción</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;