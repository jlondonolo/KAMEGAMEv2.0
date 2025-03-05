// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-[#0d0d22] px-4 md:px-5 py-2.5 flex flex-wrap justify-between items-center">
            <div className="logo flex items-center">
                <img src="/logo/logokamegame.webp" alt="Logo Kame Game" className="h-14 md:h-20" />
            </div>

            {/* Mobile menu button */}
            <button
                className="md:hidden text-white p-2 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Desktop and Mobile Navigation */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto order-last md:order-none`}>
                <ul className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-0">
                    <li className="w-full md:w-auto">
                        <Link
                            to="/"
                            className={`text-white px-4 py-2 rounded-md transition-colors block w-full md:w-auto text-center ${
                                location.pathname === '/' ? 'bg-[#2e04c5]' : 'hover:bg-[#2e04c5]'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Inicio
                        </Link>
                    </li>
                    <li className="w-full md:w-auto">
                        <Link
                            to="/tienda"
                            className={`text-white px-4 py-2 rounded-md transition-colors block w-full md:w-auto text-center ${
                                location.pathname === '/tienda' ? 'bg-[#2e04c5]' : 'hover:bg-[#2e04c5]'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Tienda
                        </Link>
                    </li>
                    <li className="w-full md:w-auto">
                        <Link
                            to="/duelo"
                            className={`text-white px-4 py-2 rounded-md transition-colors block w-full md:w-auto text-center ${
                                location.pathname === '/duelo' ? 'bg-[#2e04c5]' : 'hover:bg-[#2e04c5]'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Duelo
                        </Link>
                    </li>
                    <li className="w-full md:w-auto">
                        <Link
                            to="/inventario"
                            className={`text-white px-4 py-2 rounded-md transition-colors block w-full md:w-auto text-center ${
                                location.pathname === '/inventario' ? 'bg-[#2e04c5]' : 'hover:bg-[#2e04c5]'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Inventario
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Icons */}
            <div className="flex gap-2 md:order-last">
                <Link to="/perfil">
                    <img
                        src="/logo/logo%20perfil.webp"
                        alt="Usuario"
                        className="w-7 h-7 md:w-8 md:h-8 transition-transform hover:scale-110"
                    />
                </Link>
                <Link to="/carrito">
                    <img
                        src="/logo/logocarrito.png"
                        alt="Carrito"
                        className="w-7 h-7 md:w-8 md:h-8 transition-transform hover:scale-110"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

