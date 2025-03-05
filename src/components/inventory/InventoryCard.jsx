const InventoryCard = ({ item, onOpenPackage }) => {
    const handleOpen = () => {
        if (item.type === "package") {
            if (onOpenPackage) {
                onOpenPackage(item);
            } else {
                console.error("❌ Error: onOpenPackage no está definido");
            }
        }
    };

    return (
        <div className="bg-[#282a36] p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-48 object-contain mb-4 rounded"
            />
            <h2 className="text-lg text-white font-semibold mb-2 text-center">
                {item.name}
            </h2>
            {item.type === "package" && (
                <button
                    onClick={handleOpen}
                    className="w-full bg-[#ffb86c] text-black py-2 rounded hover:bg-[#ffaa44] transition-colors"
                >
                    Abrir Paquete
                </button>
            )}
        </div>
    );
};

export default InventoryCard;
