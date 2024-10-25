import { api } from '@services/api';
import { Character } from 'types';

interface UseCharacterDetailResult {
    data?: Character | null
    error?: string
}

export async function useCharacterDetail(characterID: number): Promise<UseCharacterDetailResult> {
    try {
        const response = await api.get(`/character/${characterID}`);
        const character: Character = response.data;
        return { data: character };
    } catch (error: any) {
        const errorMessage: string = error.message;
        return { error: errorMessage };
    }
}