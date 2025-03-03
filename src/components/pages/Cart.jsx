// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth'; 
import CartItem from '../../components/cart/CartItem.jsx';
import CartSummary from '../../components/cart/CartSummary.jsx';
import RelatedProducts from '../../components/cart/RelatedProducts';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
    const { isAuthenticated } = useAuth(); 
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [magicPoints, setMagicPoints] = useState(0);

    // Obtener los puntos mágicos del usuario
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (storedUser && storedUser.magicPoints) {
            setMagicPoints(storedUser.magicPoints);
        }
    }, []);

    const handleBuy = () => {
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de comprar.');
            return;
        }

        if (!isAuthenticated()) {
            setShowLoginModal(true); 
            return;
        }

        const totalCost = getTotal();
        if (magicPoints < totalCost) {
            alert('No tienes suficientes puntos mágicos para realizar esta compra.');
            return;
        }

        const currentInventory = JSON.parse(localStorage.getItem('inventory') || '[]');
        const updatedInventory = [...currentInventory];

        cart.forEach(item => {
            const existingItem = updatedInventory.find(i => i.name === item.name);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                updatedInventory.push(item);
            }
        });

        localStorage.setItem('inventory', JSON.stringify(updatedInventory));

        // Descontamos los puntos mágicos
        const updatedUser = {
            ...JSON.parse(localStorage.getItem('user')),
            magicPoints: magicPoints - totalCost
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        clearCart();
        alert('Compra realizada con éxito. Tus cartas están ahora en el inventario.');
        navigate('/inventario');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl text-white font-bold mb-8">Carrito</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#0d0d22] p-6 rounded-lg">
                    {cart.length === 0 ? (
                        <p className="text-white text-center text-lg">El carrito está vacío</p>
                    ) : (
                        cart.map((item, index) => (
                            <CartItem
                                key={index}
                                item={item}
                                index={index}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeFromCart}
                            />
                        ))
                    )}
                </div>

                <div className="lg:col-span-1">
                    <CartSummary
                        items={cart}
                        total={getTotal()}
                        onBuy={handleBuy}
                    />
                </div>
            </div>

            <RelatedProducts />

            {showLoginModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-[#282a36] text-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">Debes iniciar sesión</h2>
                        <p className="mb-4">Para completar tu compra, debes iniciar sesión.</p>
                        <button
                            className="bg-[#ff5555] px-4 py-2 rounded-md text-white hover:bg-[#ff4444]"
                            onClick={() => navigate('/login')}
                        >
                            Ir a iniciar sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
