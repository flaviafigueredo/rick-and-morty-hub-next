import React from 'react';

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="join flex justify-center p-6">
            <button
                className="join-item btn"
                onClick={() => {
                    if (currentPage > 1) {
                        onPageChange(currentPage - 1);
                    }
                }}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                «
            </button>
            <button className="join-item btn" style={{ color: 'var(--fallback-bc, oklch(var(--bc) / var(--tw-text-opacity)))', cursor: 'default', pointerEvents: 'none' }}>
                Page {currentPage} of {totalPages}
            </button>
            <button
                className="join-item btn"
                onClick={() => {
                    if (currentPage < totalPages) {
                        onPageChange(currentPage + 1);
                    }
                }}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                »
            </button>
        </div>
    );
};