// src/pages/Inventory.jsx
import React from 'react';
import { useInventory } from '../../hooks/useInventory.js';
import SearchBar from '../../components/inventory/SearchBar.jsx';
import InventoryCard from '../../components/inventory/InventoryCard.jsx';
import EmptyState from '../../components/inventory/EmptyState.jsx';

const Inventory = () => {
    const {
        inventory,
        searchTerm,
        filterInventory
    } = useInventory();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl text-white font-bold mb-8 text-center">
                    Tu Inventario
                </h1>

                <SearchBar
                    value={searchTerm}
                    onChange={filterInventory}
                />

                {inventory.length === 0 ? (
                    <EmptyState searchTerm={searchTerm} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {inventory.map((item, index) => (
                            <InventoryCard
                                key={`${item.name}-${index}`}
                                item={item}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;