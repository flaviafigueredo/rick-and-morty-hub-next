"use client"
import { useParams } from "next/navigation"
import { LoadingSpinner } from "@components/LoadingSpinner"
import { useCharacterDetail } from "@hooks/useCharacterDetail"
import { useEpisodes } from "@hooks/useEpisode"
import React, { useEffect, useState } from "react"
import { Character, Episode } from "types"
import Link from "next/link"
import { Header } from "@components/Header"
import { Footer } from "@components/Footer"
import { Badge } from "@components/Badge"

const CharacterDetail: React.FC = () => {
    const { id } = useParams()
    const [character, setCharacter] = useState<Character | null>(null)
    const [episodes, setEpisodes] = useState<Episode[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            setLoading(true)
            const characterID = parseInt(id as string)
            const result = await useCharacterDetail(characterID)

            if (result.error) {
                setError(result.error)
            } else if (result.data) {
                setCharacter(result.data)

                const episodeResult = await useEpisodes(result.data.episode)
                if (episodeResult.error) {
                    setError(episodeResult.error)
                } else {
                    setEpisodes(episodeResult.data || [])
                }
            }
            setLoading(false)
        }

        fetchCharacterDetail()
    }, [id])

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <>
            <Header />
            <section className="flex flex-col justify-center items-center gap-3 min-h-full p-6 mx-auto bg-base-100" style={{ width: '500px' }}>
                <div className="flex flex-col items-center justify-center p-2 w-full">
                    <figure className="mb-4 drop-shadow-lg">
                        <img src={character?.image} alt={`${character?.name} image`} className="rounded-lg" />
                    </figure>

                    <h2 className="card-title text-3xl font-bold mb-2">{character?.name}</h2>

                    <div className="flex flex-wrap gap-3 mb-4">
                        <Badge value={character?.status || "Unknown"} type="status" />
                        <Badge value={character?.species || "Unknown"} type="species" />
                        <Badge value={character?.gender || "Unknown"} type="gender" />
                    </div>

                    <div className="w-full">
                        <p className="text-lg pb-4">
                            <strong>Type:</strong> {character?.type || "Unknown"}
                        </p>
                        <p className="text-lg pb-4">
                            <strong>Origin:</strong> {character?.origin.name}
                        </p>
                        <p className="text-lg">
                            <strong>Location:</strong> {character?.location.name}
                        </p>

                        <details className="collapse collapse-arrow">
                            <summary className="collapse-title text-lg px-0">
                                <strong>Episodes</strong>
                            </summary>
                            <div className="collapse-content p-0">
                                {episodes.length > 0 ? (
                                    episodes.map((episode) => (
                                        <div key={episode.id} className="mb-2">
                                            <p>
                                                <strong>{episode.name}</strong> - {episode.air_date} (Episode {episode.episode})
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No episodes found for this character.</p>
                                )}
                            </div>
                        </details>
                    </div>
                </div>

                <Link href="/" className="self-end">
                    <button className="btn btn-neutral self-end">Back</button>
                </Link>
            </section>
            <Footer />
        </>
    )
}

export default CharacterDetail