import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart'; // Asegúrate de importar useCart

const PackageCard = ({ image, name, type, price }) => {
    const { addToCart } = useCart();
    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = () => {
        addToCart({
            name,
            price,
            image,
            quantity: 1,
            type: 'package' // Para identificar que es un paquete
        });

        // Mostrar notificación
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    return (
        <div className="bg-[#27293d] rounded-lg shadow-md overflow-hidden">
            <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h4 className="text-xl font-semibold text-white">{name}</h4>
                <p className="text-gray-400 mt-2">{type}</p>
                <p className="text-lg font-bold text-blue-400 mt-2">{price} PM</p>
                <button
                    onClick={handleAddToCart}
                    className="mt-4 w-full bg-[#6200ee] text-white py-2 px-4 rounded hover:bg-[#7722ff] transition-colors"
                >
                    Comprar Paquete
                </button>
            </div>

            {/* Notificación */}
            {showNotification && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up">
                    {name} se agregó al carrito
                </div>
            )}
        </div>
    );
};

const Packages = () => {
    const packages = [
        {
            id: 'basic',
            image: '/imagenes/basica.webp',
            name: 'Paquete Básico',
            type: '3 cartas nivel 1-3',
            price: 250
        },
        {
            id: 'medium',
            image: '/imagenes/media.webp',
            name: 'Paquete Medio',
            type: '3 cartas nivel 4-5',
            price: 500
        },
        {
            id: 'premium',
            image: '/imagenes/alta.webp',
            name: 'Paquete Premium',
            type: '3 cartas nivel 6-8',
            price: 750
        }
    ];

    return (
        <section>
            <h3 className="text-2xl font-bold text-white mb-6">
                Catálogo de Paquetes
            </h3>

            <div className="flex flex-col gap-6">
                {packages.map(pkg => (
                    <PackageCard
                        key={pkg.id}
                        image={pkg.image}
                        name={pkg.name}
                        type={pkg.type}
                        price={pkg.price}
                    />
                ))}
            </div>
        </section>
    );
};

export default Packages;