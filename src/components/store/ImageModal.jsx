import React, { useEffect, useRef, useState } from 'react';

export const ImageModal = ({ imageUrl, onClose }) => {
    const modalRef = useRef(null);
    const imageRef = useRef(null);
    const magnifierRef = useRef(null);
    const [showMagnifier, setShowMagnifier] = useState(false);
    const magnifierSize = 150;
    const magnification = 2;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    const handleMouseMove = (e) => {
        if (!imageRef.current || !magnifierRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calcular posición relativa (0-1)
        const xRelative = x / rect.width;
        const yRelative = y / rect.height;

        // Mover la lupa
        magnifierRef.current.style.left = `${x - magnifierSize/2}px`;
        magnifierRef.current.style.top = `${y - magnifierSize/2}px`;

        // Actualizar posición del background de la lupa
        const bgX = xRelative * 100;
        const bgY = yRelative * 100;
        magnifierRef.current.style.backgroundPosition = `${bgX}% ${bgY}%`;
        magnifierRef.current.style.backgroundSize = `${rect.width * magnification}px ${rect.height * magnification}px`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="relative bg-[#0c0c1d] p-4 rounded-lg w-[90%] sm:w-[60%] md:w-[45%] lg:w-[35%] xl:w-[30%]"
            >
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-[#2e04c5] w-8 h-8 rounded-full text-white flex items-center justify-center hover:bg-[#7a04c5] transition-colors z-10"
                >
                    ×
                </button>

                <div
                    className="relative"
                    onMouseEnter={() => setShowMagnifier(true)}
                    onMouseLeave={() => setShowMagnifier(false)}
                    onMouseMove={handleMouseMove}
                >
                    <img
                        ref={imageRef}
                        src={imageUrl}
                        alt="Carta ampliada"
                        className="w-full h-auto rounded"
                    />

                    {showMagnifier && (
                        <div
                            ref={magnifierRef}
                            className="absolute pointer-events-none border-2 border-[#2e04c5] rounded-full overflow-hidden"
                            style={{
                                width: `${magnifierSize}px`,
                                height: `${magnifierSize}px`,
                                backgroundImage: `url(${imageUrl})`,
                                backgroundRepeat: 'no-repeat',
                                boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};