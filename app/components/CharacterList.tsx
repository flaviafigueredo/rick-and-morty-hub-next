import React, { useEffect, useState } from "react"
import { useCharacters } from "@hooks/useCharacters"
import { CharacterCard } from "@components/CharacterCard"
import { Character } from "types"

export const CharacterList: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCharacters = async () => {
            const result = await useCharacters()

            if (result.error) {
                setError(result.error)
            } else if (result.data) {
                setCharacters(result.data)
            }
        }

        fetchCharacters()
    }, [])

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <section className="grid max-w-7xl mx-auto p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map(character => (
                <CharacterCard key={character.id} character={character} />
            ))}
        </section>
    )
}