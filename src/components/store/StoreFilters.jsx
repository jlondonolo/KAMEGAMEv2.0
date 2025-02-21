// src/components/store/StoreFilters.jsx
import React from 'react';

const StoreFilters = ({ filters, onFilterChange }) => {
    return (
        <section className="bg-[#0d0d22] mx-5 p-6 rounded-lg">
            <h3 className="text-white text-xl mb-4">Filtros de Búsqueda</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={filters.name}
                    onChange={(e) => onFilterChange('name', e.target.value)}
                    className="p-2 bg-[#1e1e2f] text-white rounded border border-gray-700"
                />

                <select
                    value={filters.attribute}
                    onChange={(e) => onFilterChange('attribute', e.target.value)}
                    className="p-2 bg-[#1e1e2f] text-white rounded border border-gray-700"
                >
                    <option value="">Atributo</option>
                    <option value="water">Agua</option>
                    <option value="fire">Fuego</option>
                    <option value="earth">Tierra</option>
                    <option value="wind">Viento</option>
                    <option value="light">Luz</option>
                    <option value="dark">Oscuridad</option>
                    <option value="divine">Divino</option>
                </select>

                <select
                    value={filters.level}
                    onChange={(e) => onFilterChange('level', e.target.value)}
                    className="p-2 bg-[#1e1e2f] text-white rounded border border-gray-700"
                >
                    <option value="">Nivel</option>
                    <option value="1-3">Nivel 1-3</option>
                    <option value="4-5">Nivel 4-5</option>
                    <option value="6-8">Nivel 6-8</option>
                    <option value="10+">Nivel 10-12</option>
                </select>

                <select
                    value={filters.subtype}
                    onChange={(e) => onFilterChange('subtype', e.target.value)}
                    className="p-2 bg-[#1e1e2f] text-white rounded border border-gray-700"
                >
                    <option value="">Subtipo</option>
                    <option value="dragon">Dragón</option>
                    <option value="warrior">Guerrero</option>
                    <option value="spellcaster">Lanzador de Conjuros</option>
                    <option value="fairy">Hada</option>
                    <option value="fiend">Demonio</option>
                    <option value="zombie">Zombi</option>
                    <option value="machine">Máquina</option>
                    <option value="aqua">Aqua</option>
                    <option value="beast">Bestia</option>
                    <option value="beast-warrior">Guerrero-Bestia</option>
                    <option value="dinosaur">Dinosaurio</option>
                    <option value="divine-beast">Bestia Divina</option>
                </select>

                <select
                    value={filters.priceRange}
                    onChange={(e) => onFilterChange('priceRange', e.target.value)}
                    className="p-2 bg-[#1e1e2f] text-white rounded border border-gray-700"
                >
                    <option value="">Todos los precios</option>
                    <option value="0-100">100 PM o menos</option>
                    <option value="101-200">101 - 200 PM</option>
                    <option value="201-300">201 - 300 PM</option>
                    <option value="301-999">301 - 999 PM</option>
                    <option value="1000">1000 PM</option>
                </select>

                <select
                    value={filters.sortOrder}
                    onChange={(e) => onFilterChange('sortOrder', e.target.value)}
                    className="p-2 bg-[#1e1e2f] text-white rounded border border-gray-700"
                >
                    <option value="default">Alfabético</option>
                    <option value="asc">Menor Precio</option>
                    <option value="desc">Mayor Precio</option>
                </select>
            </div>
        </section>
    );
};

export default StoreFilters;