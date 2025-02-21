// src/components/profile/FavoriteCards.jsx
import React from 'react';

const FavoriteCards = ({ favorites }) => {
    return (
        <aside className="bg-[#282a36] p-5 rounded-lg w-full md:w-72 h-[550px] overflow-y-auto">
            <h2 className="text-xl text-white font-bold mb-4 text-center">
                Cartas Favoritas
            </h2>
            <div className="space-y-4">
                {favorites.map((card, index) => (
                    <div
                        key={index}
                        className="bg-[#44475a] p-4 rounded-lg text-center transition-transform hover:scale-105"
                    >
                        <img
                            src={card.image}
                            alt={card.name}
                            className="w-36 mx-auto mb-2"
                        />
                        <p className="text-white">{card.name}</p>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default FavoriteCards;