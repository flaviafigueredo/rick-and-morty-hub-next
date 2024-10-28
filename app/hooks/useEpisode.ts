import { useEffect, useState } from 'react';
import { api } from '@services/api';
import { Episode } from 'types';

export function useEpisodes(episodeLinks: string[]) {
    const [data, setData] = useState<Episode[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEpisodes = async () => {
            setLoading(true);
            try {
                const episodeRequests = episodeLinks.map(link => api.get(link));
                const responses = await Promise.all(episodeRequests);
                const episodes: Episode[] = responses.map(response => response.data);
                setData(episodes);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        if (episodeLinks.length > 0) {
            fetchEpisodes();
        } else {
            setLoading(false);
        }
    }, [episodeLinks]);

    return { data, error, loading };
}