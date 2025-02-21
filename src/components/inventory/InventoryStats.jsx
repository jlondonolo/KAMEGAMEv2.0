// src/components/inventory/InventoryStats.jsx
import React from 'react';
import { Package, Star, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-[#282a36] p-4 rounded-lg flex items-center gap-4">
        <div className="p-3 bg-[#2e04c5] rounded-lg">
            <Icon size={24} className="text-white" />
        </div>
        <div>
            <h3 className="text-gray-400 text-sm">{title}</h3>
            <p className="text-white text-xl font-bold">{value}</p>
        </div>
    </div>
);

const InventoryStats = ({ inventory }) => {
    const totalCards = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const uniqueCards = inventory.length;
    const rareCards = inventory.filter(item => item.rare).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                icon={Package}
                title="Total de Cartas"
                value={totalCards}
            />
            <StatCard
                icon={TrendingUp}
                title="Cartas Únicas"
                value={uniqueCards}
            />
            <StatCard
                icon={Star}
                title="Cartas Raras"
                value={rareCards}
            />
        </div>
    );
};

export default InventoryStats;