import React from "react";
import { useInventory } from "../../hooks/useInventory.js";
import InventoryCard from "../../components/inventory/InventoryCard.jsx";
import SearchBar from "../../components/inventory/SearchBar.jsx";
import { getRandomCardsByLevel } from "../../hooks/useStore.js"; // ✅ Importación corregida

const Inventory = () => {
    const { inventory, searchTerm, setSearchTerm, openPackage } = useInventory();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl text-white font-bold mb-8 text-center">Tu Inventario</h1>

                <SearchBar value={searchTerm} onChange={setSearchTerm} />

                {inventory.length === 0 ? (
                    <p className="text-white text-center mt-6">Tu inventario está vacío.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {inventory.map((item, index) => (
                            <InventoryCard key={index} item={item} onOpenPackage={() => openPackage(item)} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Inventory;
