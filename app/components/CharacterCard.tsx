import Link from "next/link"
import React from "react"
import { Badge } from "@components/Badge"

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
    return (
        <Link href={`/character/${character.id}`} passHref>
            <div className="card bg-base-100 shadow-xl hover:scale-105 cursor-pointer w-full sm:w-auto mx-auto" style={{ maxWidth: '320px', height: '470px' }}>
                <figure className="w-full overflow-hidden">
                    <img src={character.image} alt={`${character.name} image`} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body flex flex-col justify-between">
                    <h2 className="card-title">{character.name}</h2>
                    <div className="flex gap-2 flex-wrap">
                        <Badge type="status" value={character.status} />
                        <Badge type="species" value={character.species} />
                        <Badge type="gender" value={character.gender} />
                    </div>
                </div>
            </div>
        </Link>
    )
}