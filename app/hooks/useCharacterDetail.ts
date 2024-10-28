import { useEffect, useState } from 'react';
import { api } from '@services/api';
import { Character } from 'types';

export function useCharacterDetail(characterID: number) {
    const [data, setData] = useState<Character | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            try {
                const response = await api.get(`/character/${characterID}`);
                setData(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacterDetail();
    }, [characterID]);

    return { data, error, loading };
}