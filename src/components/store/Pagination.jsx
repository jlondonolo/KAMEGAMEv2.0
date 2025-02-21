// src/components/store/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pages.push(i);
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pages.push('...');
            }
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#1e1e2f] text-white rounded disabled:opacity-50"
            >
                ←
            </button>

            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={page === '...'}
                    className={`px-4 py-2 rounded ${
                        page === currentPage
                            ? 'bg-[#2e04c5] text-white'
                            : 'bg-[#1e1e2f] text-white hover:bg-[#2e04c5]'
                    } ${page === '...' ? 'cursor-default' : 'cursor-pointer'}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#1e1e2f] text-white rounded disabled:opacity-50"
            >
                →
            </button>
        </div>
    );
};

export default Pagination;