'use client';
import { useParams } from 'next/navigation';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { useCharacterDetail } from '@hooks/useCharacterDetail';
import { useEpisodes } from '@hooks/useEpisode';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@components/Badge';
import { ErrorMessage } from '@components/ErrorMessage';

const CharacterDetail: React.FC = () => {
    const { id } = useParams();

    const characterID = parseInt(id as string);
    const { data: character, error: characterError, loading: characterLoading } = useCharacterDetail(characterID);
    const { data: episodes, error: episodesError, loading: episodesLoading } = useEpisodes(character?.episode || []);

    if (characterLoading || episodesLoading) {
        return <LoadingSpinner />;
    }

    if (characterError) {
        return <ErrorMessage message={`Error fetching character: ${characterError}`} />;
    }

    if (episodesError) {
        return <ErrorMessage message={`Error fetching episodes: ${episodesError}`} />;
    }

    return (
        <>
            <main className="flex flex-col justify-center items-center gap-3 min-h-full p-6 mx-auto" style={{ maxWidth: '500px' }}>
                <div className="flex flex-col items-center justify-center p-2 w-full">
                    <figure className="mb-4 drop-shadow-lg">
                        <Image
                            src={character?.image || 'https://placehold.co/300x300?text=Image+Not+Found'}
                            alt={character?.image ?
                                `Image of ${character?.name}, a ${character?.species} from ${character?.origin.name}` :
                                `Image not found for ${character?.name}`
                            }
                            className="rounded-lg"
                            priority
                            width={300}
                            height={300}
                        />
                    </figure>

                    <h2 className="card-title text-3xl font-bold mb-2">{character?.name}</h2>

                    <div className="flex flex-wrap gap-3 mb-4">
                        <Badge value={character?.status || 'Unknown'} type="status" />
                        <Badge value={character?.species || 'Unknown'} type="species" />
                        <Badge value={character?.gender || 'Unknown'} type="gender" />
                    </div>

                    <div className="w-full">
                        <p className="text-lg pb-4" aria-label="Character type">
                            <strong>Type:</strong> {character?.type || 'Unknown'}
                        </p>
                        <p className="text-lg pb-4" aria-label="Character origin">
                            <strong>Origin:</strong> {character?.origin.name}
                        </p>
                        <p className="text-lg" aria-label="Character location">
                            <strong>Location:</strong> {character?.location.name}
                        </p>

                        <details className="collapse collapse-arrow">
                            <summary className="collapse-title text-lg px-0">
                                <strong>Episodes</strong>
                            </summary>
                            <div className="collapse-content p-0" id="episode-list">
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
                    <button className="btn btn-neutral self-end" aria-label="Go back to character list">Back</button>
                </Link>
            </main>
        </>
    );
};

export default CharacterDetail;