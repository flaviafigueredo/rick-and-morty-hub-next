import { api } from "@services/api"
import { Character } from "types"

interface UseCharactersResult {
    data?: Character[]
    error?: string
    totalPages?: number
}

export async function useCharacters(pageID: number): Promise<UseCharactersResult> {
    try {
        const response = await api.get(`/character?page=${pageID}`)       
        const characters: Character[] = response.data.results
        const totalPages: number = response.data.info.pages
        return { data: characters, totalPages }
    } catch (error: any) {
        const errorMessage: string = error.message
        return { error: errorMessage }
    }
}