import React, { useEffect, useState, useRef } from 'react';
import { useCharacters } from '@hooks/useCharacters';
import { CharacterCard } from '@components/CharacterCard';
import { Pagination } from '@components/Pagination';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { ErrorMessage } from '@components/ErrorMessage';

export const CharacterList: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data: characters, error, totalPages } = useCharacters(currentPage, searchQuery);

    const [loading, setLoading] = useState<boolean>(true);

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoading(true);
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (error) {
            setLoading(false);
        } else if (characters.length > 0) {
            setLoading(false);
        }
    }, [characters, error]);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {characters.length > 0 ? (
                <section ref={listRef} aria-labelledby="character-list-heading" className="grid max-w-7xl mx-auto p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <h2 id="character-list-heading" className="sr-only">List of Characters</h2>
                    {characters.map(character => (
                        <CharacterCard key={character.id} character={character} />
                    ))}
                </section>
            ) : (
                <section role="status" aria-live="polite" className="text-center">
                    <p>No characters found.</p>
                </section>
            )}

            {characters.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages || 0}
                    onPageChange={(page) => {
                        setCurrentPage(page);
                        listRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                />
            )}
        </>
    );
};