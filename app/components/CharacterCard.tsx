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
    let badgeClass = "badge border-0 text-white"
    let speciesClass = "badge border-0 text-white"
    let genderClass = "badge border-0 text-white"

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

    switch (character.species) {
        case "Human":
            speciesClass += " bg-blue-500"
            break
        case "Alien":
            speciesClass += " bg-purple-500"
            break
        case "Humanoid":
            speciesClass += " bg-green-700"
            break
        case "unknown":
            speciesClass += " bg-gray-500"
            break
        case "Poopybutthole":
            speciesClass += " bg-yellow-500"
            break
        case "Mythological Creature":
            speciesClass += " bg-yellow-700"
            break
        case "Animal":
            speciesClass += " bg-brown-500"
            break
        case "Robot":
            speciesClass += " bg-gray-700"
            break
        case "Cronenberg":
            speciesClass += " bg-red-700"
            break
        case "Disease":
            speciesClass += " bg-green-500"
            break
        default:
            speciesClass += " bg-gray-300"
            break
    }

    switch (character.gender) {
        case "Male":
            genderClass += " bg-blue-600"
            break
        case "Female":
            genderClass += " bg-pink-600"
            break
        case "unknown":
            genderClass += " bg-gray-600"
            break
        case "Genderless":
            genderClass += " bg-green-600"
            break
        default:
            genderClass += " bg-yellow-600"
            break
    }

    return (
        <div className="card bg-base-100 shadow-xl hover:scale-105 cursor-pointer w-full sm:w-auto mx-auto" style={{ maxWidth: '320px' }}>
            <figure className="w-full overflow-hidden">
                <img src={character.image} alt={`${character.name} image`} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{character.name}</h2>
                <div className="flex space-x-2">
                    <p className={badgeClass} aria-label={`Status: ${character.status}`}>
                        {character.status}
                    </p>
                    <p className={speciesClass} aria-label={`Species: ${character.species}`}>
                        {character.species}
                    </p>
                    <p className={genderClass} aria-label={`Gender: ${character.gender}`}>
                        {character.gender}
                    </p>
                </div>
            </div>
        </div>
    )
}