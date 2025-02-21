// src/pages/Store.jsx
import React from 'react';
import { useStore } from '../../hooks/useStore.js';
import LaunchOffers from '../../components/store/LaunchOffers.jsx';
import StoreFilters from '../store/StoreFilters';
import CardGrid from '../../components/store/CardGrid.jsx';
import Pagination from '../../components/store/Pagination.jsx';
import Packages from '../../components/store/Packages.jsx'; // Añade esta importación

const Store = () => {
    const {
        cards,
        loading,
        error,
        filters,
        currentPage,
        totalPages,
        updateFilter,
        setCurrentPage,
        calculatePrice,
        totalCards
    } = useStore();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1e1e2f] flex items-center justify-center">
                <div className="text-white text-xl">Cargando...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-[#1e1e2f] flex items-center justify-center">
                <div className="text-red-500 text-xl">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1e1e2f] pb-8">
            <LaunchOffers />

            <StoreFilters
                filters={filters}
                onFilterChange={updateFilter}
            />

            {/* Contenedor flex que cambia a columna en móvil */}
            <div className="mx-5 mt-8 flex flex-col lg:flex-row gap-8">
                {/* Contenedor de cartas */}
                <div className="flex-1 bg-[#0c0c1d] rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white text-xl">
                            Catálogo de Cartas ({totalCards} resultados)
                        </h3>
                    </div>

                    {cards.length === 0 ? (
                        <div className="text-center text-white py-8">
                            No se encontraron cartas que coincidan con los filtros seleccionados.
                        </div>
                    ) : (
                        <>
                            <CardGrid
                                cards={cards}
                                calculatePrice={calculatePrice}
                            />

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    )}
                </div>

                {/* Contenedor de paquetes */}
                <div className="lg:w-1/4 bg-[#0c0c1d] rounded-lg p-6">
                    <Packages />
                </div>
            </div>
        </div>
    );
};

export default Store;