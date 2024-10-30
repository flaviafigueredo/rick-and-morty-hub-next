import { render, screen, act } from '@testing-library/react';
import CharacterDetail from 'character/[id]/page';
import * as nextNavigation from 'next/navigation';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import { useEpisodes } from '../hooks/useEpisode';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
    useRouter: jest.fn(),
}));

jest.mock('../hooks/useCharacterDetail');
jest.mock('../hooks/useEpisode');

describe('CharacterDetail component', () => {
    beforeEach(() => {
        (nextNavigation.useParams as jest.Mock).mockReturnValue({ id: '1' });

        (useEpisodes as jest.Mock).mockResolvedValue({
            data: [],
            error: null,
        });
    });

    it('should display a loading spinner while fetching character details', async () => {
        (useCharacterDetail as jest.Mock).mockReturnValueOnce({
            data: null,
            error: null,
            loading: true,
        });

        await act(async () => {
            render(<CharacterDetail />);
        });

        expect(screen.getByLabelText('Loading content')).toBeInTheDocument();
    });

    it('should display an error message when there is a problem fetching character data', async () => {
        (useCharacterDetail as jest.Mock).mockReturnValueOnce({
            data: null,
            error: 'Failed to fetch character data',
            loading: false,
        });

        await act(async () => {
            render(<CharacterDetail />);
        });

        const errorMessage = screen.getByText(/Error fetching character: Failed to fetch character data/i);
        expect(errorMessage).toBeInTheDocument();
    });

    it('should display an error message when there is a problem fetching episodes', async () => {
        (useCharacterDetail as jest.Mock).mockReturnValueOnce({
            data: {
                id: 1,
                name: 'Rick Sanchez',
                species: 'Human',
                gender: 'Male',
                status: 'Alive',
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                origin: { name: 'Earth' },
                location: { name: 'Earth' },
                episode: ['episode1', 'episode2'],
            },
            error: null,
            loading: false,
        });

        (useEpisodes as jest.Mock).mockReturnValueOnce({
            data: [],
            error: 'Failed to fetch episodes',
            loading: false,
        });

        await act(async () => {
            render(<CharacterDetail />);
        });

        const errorMessage = screen.getByText(/Error fetching episodes: Failed to fetch episodes/i);
        expect(errorMessage).toBeInTheDocument();
    });

    it('should display character details when fetch is successful', async () => {
        (useCharacterDetail as jest.Mock).mockReturnValue({
            data: {
                id: 1,
                name: 'Rick Sanchez',
                species: 'Human',
                gender: 'Male',
                status: 'Alive',
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                origin: { name: 'Earth' },
                location: { name: 'Earth' },
                episode: ['episode1', 'episode2'],
            },
            error: null,
            loading: false,
        });

        (useEpisodes as jest.Mock).mockReturnValue({
            data: [
                { id: 1, name: 'Pilot', air_date: 'December 2, 2013', episode: 'S01E01', url: 'https://rickandmortyapi.com/api/episode/1' },
            ],
            error: null,
            loading: false,
        });

        await act(async () => {
            render(<CharacterDetail />);
        });

        expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Image of Rick Sanchez/i)).toBeInTheDocument();
        expect(screen.getByText(/Alive/i)).toBeInTheDocument();
        expect(screen.getByText(/Human/i)).toBeInTheDocument();
        expect(screen.getByText(/Male/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Character origin')).toHaveTextContent(/Earth/i);
        expect(screen.getByLabelText('Character location')).toHaveTextContent(/Earth/i);
    });

    it('should toggle the episode list when the summary is clicked', async () => {
        (useCharacterDetail as jest.Mock).mockReturnValueOnce({
            data: {
                id: 1,
                name: 'Rick Sanchez',
                species: 'Human',
                gender: 'Male',
                status: 'Alive',
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                origin: { name: 'Earth' },
                location: { name: 'Earth' },
                episode: ['episode1', 'episode2'],
            },
            error: null,
            loading: false,
        });

        (useEpisodes as jest.Mock).mockReturnValueOnce({
            data: [
                { id: 1, name: 'Pilot', air_date: 'December 2, 2013', episode: 'S01E01', url: 'https://rickandmortyapi.com/api/episode/1' },
            ],
            error: null,
            loading: false,
        });

        await act(async () => {
            render(<CharacterDetail />);
        });

        const episodeSummary = screen.getByText(/Episodes/i);
        userEvent.click(episodeSummary);

        const episode = await screen.findByText(/Pilot/i);
        expect(episode).toBeInTheDocument();
    });
});