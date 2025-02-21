// src/pages/Home.jsx
import React from 'react';
import News from '../../components/home/NewsSection';
import Shop from '../../components/home/ShopPreview';

const Home = () => {
    return (
        <div className="min-h-screen bg-[#1e1e2f] pb-8">
            {/* Sección de Noticias */}
            <section className="py-8 px-4">
                <h2 className="text-2xl font-bold text-white mb-6">Noticias</h2>
                <News />
            </section>

            {/* Sección de Tienda */}
            <section className="py-8 px-4">
                <h2 className="text-2xl font-bold text-white mb-6">
                    Tienda <span role="img" aria-label="shopping cart">🛒</span>
                </h2>
                <Shop />
            </section>
        </div>
    );
};

export default Home;