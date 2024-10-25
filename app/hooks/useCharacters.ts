import { api } from '@services/api';
import { Character } from 'types';

interface UseCharactersResult {
    data?: Character[]
    error?: string
    totalPages?: number
}

export async function useCharacters(pageID: number, nameFilter?: string): Promise<UseCharactersResult> {
    try {
        const query = nameFilter
            ? `/character?name=${nameFilter}&page=${pageID}`
            : `/character?page=${pageID}`;

        const response = await api.get(query);

        const characters: Character[] = response.data.results;
        const totalPages: number = response.data.info.pages;
        return { data: characters, totalPages };
    } catch (error: any) {
        if (error.response?.status === 404) {
            return { error: 'Character not found. Please try again.' };
        }

        const errorMessage: string = error.message || 'An unexpected error occurred.';
        return { error: errorMessage };
    }
}