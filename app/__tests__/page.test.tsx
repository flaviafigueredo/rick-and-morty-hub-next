import { render, screen, act } from "@testing-library/react"
import CharacterDetail from "character/[id]/page"
import * as nextNavigation from "next/navigation"
import { useCharacterDetail } from "../hooks/useCharacterDetail"
import { useEpisodes } from "../hooks/useEpisode"
import { ReactNode, AnchorHTMLAttributes } from "react"
import userEvent from "@testing-library/user-event"

jest.mock("next/navigation", () => ({
    useParams: jest.fn(),
    useRouter: jest.fn(),
}))

jest.mock("next/link", () => {
    return ({ children, ...props }: { children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a {...props} onClick={props.onClick}>{children}</a>
    )
})

jest.mock("../hooks/useCharacterDetail")
jest.mock("../hooks/useEpisode")

describe("CharacterDetail component", () => {
    beforeEach(() => {
        (nextNavigation.useParams as jest.Mock).mockReturnValue({ id: "1" });

        (nextNavigation.useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });

        (useEpisodes as jest.Mock).mockResolvedValue({
            data: [],
            error: null,
        });
    });

    it("should display an error message when there is a problem fetching data", async () => {
        (useCharacterDetail as jest.Mock).mockReturnValueOnce({
            data: null,
            error: "Failed to fetch character data",
        })

        await act(async () => {
            render(<CharacterDetail />)
        })

        const errorMessage = await screen.findByText(/Error: Failed to fetch character data/i)
        expect(errorMessage).toBeInTheDocument()
    })

    it("should display character details when fetch is successful", async () => {
        (useCharacterDetail as jest.Mock).mockReturnValueOnce({
            data: {
                id: 1,
                name: "Rick Sanchez",
                species: "Human",
                gender: "Male",
                status: "Alive",
                image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                origin: { name: "Earth" },
                location: { name: "Earth" },
                episode: ["episode1", "episode2"],
            },
            error: null,
        });

        (useEpisodes as jest.Mock).mockResolvedValueOnce({
            data: [
                { id: 1, name: "Pilot", air_date: "December 2, 2013", episode: "S01E01" },
            ],
            error: null,
        })

        await act(async () => {
            render(<CharacterDetail />)
        })

        expect(await screen.findByText(/Rick Sanchez/i)).toBeInTheDocument()
        expect(screen.getByAltText(/Image of Rick Sanchez/i)).toBeInTheDocument()
        expect(screen.getByText(/Alive/i)).toBeInTheDocument()
        expect(screen.getByText(/Human/i)).toBeInTheDocument()
        expect(screen.getByText(/Male/i)).toBeInTheDocument()
    })

    it("should navigate back to the character list when 'Back' button is clicked", async () => {
        (useCharacterDetail as jest.Mock).mockReturnValueOnce({
            data: {
                id: 1,
                name: "Rick Sanchez",
                species: "Human",
                gender: "Male",
                status: "Alive",
                image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                origin: { name: "Earth" },
                location: { name: "Earth" },
                episode: ["episode1", "episode2"],
            },
            error: null,
        });

        await act(async () => {
            render(<CharacterDetail />);
        });

        const backButton = await screen.findByLabelText(/Go back to character list/i);

        expect(backButton.closest("a")).toHaveAttribute("href", "/");

        await userEvent.click(backButton);

        expect(backButton).toBeInTheDocument()
    })


    it("should toggle the episode list when the summary is clicked", async () => {
        (useCharacterDetail as jest.Mock).mockReturnValueOnce({
            data: {
                id: 1,
                name: "Rick Sanchez",
                species: "Human",
                gender: "Male",
                status: "Alive",
                image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                origin: { name: "Earth" },
                location: { name: "Earth" },
                episode: ["episode1", "episode2"],
            },
            error: null,
        });

        (useEpisodes as jest.Mock).mockResolvedValueOnce({
            data: [
                { id: 1, name: "Pilot", air_date: "December 2, 2013", episode: "S01E01" },
            ],
            error: null,
        });

        await act(async () => {
            render(<CharacterDetail />)
        })

        const episodeSummary = screen.getByText(/Episodes/i)
        userEvent.click(episodeSummary)

        const episode = await screen.findByText(/Pilot/i)
        expect(episode).toBeInTheDocument()
    })
})