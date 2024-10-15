import React, { useEffect, useState, useRef } from "react"
import { useCharacters } from "@hooks/useCharacters"
import { CharacterCard } from "@components/CharacterCard"
import { Character } from "types"
import { Pagination } from "@components/Pagination"
import { LoadingSpinner } from "@components/LoadingSpinner"
import { ErrorMessage } from "@components/ErrorMessage"

export const CharacterList: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [error, setError] = useState<string | null>(null)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const listRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchCharacters = async () => {
            setIsLoading(true)
            const result = await useCharacters(currentPage, searchQuery)
            setIsLoading(false)

            if (result.error) {
                setError(result.error)
                setCharacters([])
            } else if (result.data) {
                setError(null)
                setCharacters(result.data)
                setTotalPages(result.totalPages || 0)
            }
        }

        fetchCharacters()
    }, [currentPage, searchQuery])

    if (error) {
        return <ErrorMessage message={error} />
    }

    if (isLoading) {
        return <LoadingSpinner />
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
                    totalPages={totalPages}
                    onPageChange={(page) => {
                        setCurrentPage(page)
                        listRef.current?.scrollIntoView({ behavior: 'smooth' })
                    }}
                />
            )}
        </>
    )
}