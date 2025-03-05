import React from "react";

const InventoryCard = ({ item, onOpenPackage }) => {
    // Identificar si el item es un paquete de cartas
    const isPackage =
        item.type === "package" ||
        (item.name && item.name.includes("Paquete")) ||
        (item.name && ["Paquete Básico", "Paquete Medio", "Paquete Premium"].includes(item.name));

    // Determinar el color del botón según el tipo de paquete
    const getButtonColor = () => {
        if (item.name === "Paquete Básico") return "bg-[#6272a4] hover:bg-[#5466a0]";
        if (item.name === "Paquete Medio") return "bg-[#ffb86c] hover:bg-[#ffaa44]";
        if (item.name === "Paquete Premium") return "bg-[#bd93f9] hover:bg-[#a87df5]";
        return "bg-[#ffb86c] hover:bg-[#ffaa44]"; // Color por defecto
    };

    // Manejar la apertura del paquete
    const handleOpen = () => {
        if (isPackage) {
            if (onOpenPackage) {
                onOpenPackage(item);
            } else {
                console.error("❌ Error: onOpenPackage no está definido");
            }
        }
    };

    // Renderizar información específica de cartas
    const renderCardInfo = () => {
        if (isPackage) return null; // No mostrar detalles adicionales para paquetes

        return (
            <div className="text-gray-300 text-sm mt-2">
                {item.type && <p>Tipo: {item.type}</p>}
                {item.level && <p>Nivel: {item.level}</p>}
                {item.atk !== undefined && item.def !== undefined && (
                    <p>ATK: {item.atk} / DEF: {item.def}</p>
                )}
                {item.attribute && <p>Atributo: {item.attribute}</p>}
                {item.race && <p>Raza: {item.race}</p>}
            </div>
        );
    };

    return (
        <div className="bg-[#282a36] p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <img
                src={item.image_url || item.image || "/imagenes/placeholder-card.webp"}
                alt={item.name}
                className="w-full h-48 object-contain mb-4 rounded"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/imagenes/placeholder-card.webp";
                }}
            />
            <h2 className="text-lg text-white font-semibold mb-2 text-center">
                {item.name || "Carta sin nombre"}
            </h2>

            {renderCardInfo()}

            {isPackage && (
                <button
                    onClick={handleOpen}
                    className={`w-full mt-4 ${getButtonColor()} text-white font-medium py-2 rounded transition-colors`}
                >
                    Abrir Paquete
                </button>
            )}
        </div>
    );
};

export default InventoryCard;