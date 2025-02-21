// src/components/inventory/EmptyState.jsx
import React from 'react';
import { PackageX } from 'lucide-react';

const EmptyState = ({ searchTerm }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <PackageX size={64} className="text-gray-500 mb-4" />
            <p className="text-white text-xl mb-2">
                {searchTerm
                    ? `No se encontraron cartas que coincidan con "${searchTerm}"`
                    : 'Tu inventario está vacío'}
            </p>
            <p className="text-gray-400">
                {searchTerm
                    ? 'Intenta con otros términos de búsqueda'
                    : 'Compra algunas cartas para empezar tu colección'}
            </p>
        </div>
    );
};

export default EmptyState;
