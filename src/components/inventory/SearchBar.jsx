// src/components/inventory/SearchBar.jsx
import React from 'react';
import { Search as MagnifyingGlass } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative mb-6">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Buscar cartas..."
                className="w-full py-3 px-4 pr-12 bg-[#0d0d22] text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#2e04c5] transition-colors"
            />
            <MagnifyingGlass
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
            />
        </div>
    );
};
export default SearchBar;