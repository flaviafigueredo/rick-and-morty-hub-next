import React from "react"

interface CharacterCardProps {
    character: {
        id: number
        name: string
        status: string
        species: string
        gender: string
        image: string
    }
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    let badgeClass = "badge border-0"

    switch (character.status) {
        case "Alive":
            badgeClass += " bg-green-500"
            break
        case "Dead":
            badgeClass += " bg-red-500"
            break
        case "unknown":
            badgeClass += " bg-gray-500"
            break
        default:
            badgeClass += " bg-gray-300"
            break
    }

    return (
        <div className="card bg-base-100 shadow-xl hover:scale-105 cursor-pointer w-full sm:w-auto mx-auto" style={{ maxWidth: '320px' }}>
            <figure className="w-full overflow-hidden">
                <img src={character.image} alt={`${character.name} image`} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{character.name}</h2>
                <p className={badgeClass} aria-label={`Status: ${character.status}`}>
                    {character.status}
                </p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
            </div>
        </div>
    )
}