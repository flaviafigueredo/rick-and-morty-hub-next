import { api } from "@services/api"
import { Episode } from "types"

interface UseEpisodesResult {
    data?: Episode[]
    error?: string
}

export async function useEpisodes(episodeLinks: string[]): Promise<UseEpisodesResult> {
    try {
        const episodeResquests = episodeLinks.map(link => api.get(link))
        const responses = await Promise.all(episodeResquests)
        const episodes: Episode[] = responses.map(response => response.data)
        return { data: episodes }
    } catch (error: any) {
        const errorMessage: string = error.message
        return { error: errorMessage }
    }
}