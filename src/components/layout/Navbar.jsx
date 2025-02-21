// src/components/layout/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-[#0d0d22] px-5 py-2.5 flex justify-between items-center">
            <div className="logo">
                <img src="/logo/logokamegame.webp" alt="Logo Kame Game" className="h-20" />
            </div>
            <ul className="flex gap-4">
                <li>
                    <Link
                        to="/"
                        className={`text-white px-4 py-2 rounded-md transition-colors ${
                            location.pathname === '/' ? 'bg-[#2e04c5]' : 'hover:bg-[#2e04c5]'
                        }`}
                    >
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link
                        to="/tienda"
                        className={`text-white px-4 py-2 rounded-md transition-colors ${
                            location.pathname === '/tienda' ? 'bg-[#2e04c5]' : 'hover:bg-[#2e04c5]'
                        }`}
                    >
                        Tienda
                    </Link>
                </li>
                <li>
                    <Link
                        to="/duelo"
                        className={`text-white px-4 py-2 rounded-md transition-colors ${
                            location.pathname === '/duelo' ? 'bg-[#2e04c5]' : 'hover:bg-[#2e04c5]'
                        }`}
                    >
                        Duelo
                    </Link>
                </li>
                <li>
                    <Link
                        to="/inventario"
                        className={`text-white px-4 py-2 rounded-md transition-colors ${
                            location.pathname === '/inventario' ? 'bg-[#2e04c5]' : 'hover:bg-[#2e04c5]'
                        }`}
                    >
                        Inventario
                    </Link>
                </li>
            </ul>
            <div className="flex gap-2">
                <Link to="/perfil">
                    <img
                        src="/logo/logo%20perfil.webp"
                        alt="Usuario"
                        className="w-8 h-8 transition-transform hover:scale-110"
                    />
                </Link>
                <Link to="/carrito">
                    <img
                        src="/logo/logocarrito.png"
                        alt="Carrito"
                        className="w-8 h-8 transition-transform hover:scale-110"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

