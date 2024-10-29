import { useEffect, useState } from 'react';
import { api } from '@services/api';
import { Character } from 'types';
import { AxiosError } from 'axios';

interface UseCharactersResult {
    data: Character[];
    error?: string;
    totalPages?: number;
    loading: boolean;
}

export function useCharacters(pageID: number, nameFilter?: string): UseCharactersResult {
    const [data, setData] = useState<Character[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            const query = nameFilter
                ? `/character?name=${nameFilter}&page=${pageID}`
                : `/character?page=${pageID}`;

            try {
                const response = await api.get(query);
                setData(response.data.results);
                setTotalPages(response.data.info.pages);
            } catch (error) {
                const axiosError = error as AxiosError;
                const errorMessage: string = axiosError.response?.status === 404
                    ? 'Character not found. Please try again.'
                    : axiosError.message || 'An unexpected error occurred.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [pageID, nameFilter]);

    return { data, error, totalPages, loading };
}