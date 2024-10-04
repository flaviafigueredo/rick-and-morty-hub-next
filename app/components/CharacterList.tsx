import React, { useEffect, useState } from "react"
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

    useEffect(() => {
        const fetchCharacters = async () => {
            setIsLoading(true)
            const result = await useCharacters(currentPage, searchQuery)
            setIsLoading(false)

            if (result.error) {
                setError(result.error)
            } else if (result.data) {
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
        <div>
            <section className="grid max-w-7xl mx-auto p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {characters.map(character => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </section>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}