// src/pages/Cart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import CartItem from '../../components/cart/CartItem.jsx';
import CartSummary from '../../components/cart/CartSummary.jsx';
import RelatedProducts from '../../components/cart/RelatedProducts';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handleBuy = () => {
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de comprar.');
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
        </div>
    );
};

export default Cart;