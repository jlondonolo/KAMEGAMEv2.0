// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import Store from './components/pages/Store'
import Duel from './components/pages/Duel'
import Inventory from './components/pages/Inventory'
import Profile from './components/pages/Profile'
import Cart from './components/pages/Cart'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import './index.css'


const App = () => {
  return (
      <Router>
        <div className="min-h-screen bg-[#1e1e2f] flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tienda" element={<Store />} />
              <Route path="/duelo" element={<Duel />} />
              <Route path="/inventario" element={<Inventory />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
};

export default App;