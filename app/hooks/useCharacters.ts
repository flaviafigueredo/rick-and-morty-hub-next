import { api } from "@services/api"
import { Character } from "types"

interface UseCharactersResult {
    data?: Character[]
    error?: string
}

export async function useCharacters(): Promise<UseCharactersResult> {
    try {
        const response = await api.get("/character")
        const characters: Character[] = response.data.results
        return { data: characters }
    } catch (error: any) {
        const errorMessage: string = error.message
        return { error: errorMessage }
    }
}