import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { CharacterList } from '@components/CharacterList';
import { useCharacters } from '../hooks/useCharacters';

global.HTMLElement.prototype.scrollIntoView = jest.fn();

jest.mock('../hooks/useCharacters', () => ({
    useCharacters: jest.fn(),
}));

describe('CharacterList component', () => {
    it('should render \'No characters found.\' when no characters are found', async () => {
        (useCharacters as jest.Mock).mockReturnValue({
            data: [],
            totalPages: 0,
            error: null,
            loading: false,
        });

        render(<CharacterList searchQuery="test" />);

        await waitFor(() => {
            expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
        });
    });

    it('should display loading spinner during search', async () => {
        (useCharacters as jest.Mock).mockReturnValue({
            data: [],
            totalPages: 0,
            error: null,
            loading: true,
        });

        render(<CharacterList searchQuery="test" />);

        await waitFor(() => {
            expect(screen.getByLabelText('Loading content')).toBeInTheDocument();
        });
    });

    it('should display an error message when a search error occurs', async () => {
        (useCharacters as jest.Mock).mockReturnValue({
            data: [],
            totalPages: 0,
            error: 'Error fetching characters',
            loading: false,
        });

        render(<CharacterList searchQuery="test" />);

        await waitFor(() => {
            expect(screen.getByText(/error fetching characters/i)).toBeInTheDocument();
        });
    });

    it('should render characters when the search is successful', async () => {
        const charactersData = [
            {
                id: 1,
                name: 'Rick Sanchez',
                status: 'Alive',
                species: 'Human',
                gender: 'Male',
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
            },
            {
                id: 2,
                name: 'Morty Smith',
                status: 'Alive',
                species: 'Human',
                gender: 'Male',
                image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
            },
        ];

        (useCharacters as jest.Mock).mockReturnValue({
            data: charactersData,
            totalPages: 1,
            error: null,
            loading: false,
        });

        render(<CharacterList searchQuery="test" />);

        await waitFor(() => {
            charactersData.forEach(character => {
                expect(screen.getByText(character.name)).toBeInTheDocument();
                expect(screen.getByAltText(`${character.name} image`)).toBeInTheDocument();
            });
        });
    });

    it('should render pagination and handle page change', async () => {
        const mockResultPage1 = {
            data: [
                { id: 1, name: 'Rick', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
                { id: 2, name: 'Morty', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
            ],
            totalPages: 2,
            error: null,
            loading: false,
        };

        const mockResultPage2 = {
            data: [
                { id: 3, name: 'Summer', image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg' },
                { id: 4, name: 'Beth', image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg' },
            ],
            totalPages: 2,
            error: null,
            loading: false,
        };

        (useCharacters as jest.Mock).mockImplementation((page) => {
            return page === 1 ? mockResultPage1 : mockResultPage2;
        });

        render(<CharacterList searchQuery="" />);

        expect(await screen.findByText('Rick')).toBeInTheDocument();
        expect(screen.getByText('Morty')).toBeInTheDocument();

        const nextButton = screen.getByLabelText('Next page');
        expect(nextButton).toBeInTheDocument();

        fireEvent.click(nextButton);

        expect(await screen.findByText('Summer')).toBeInTheDocument();
        expect(screen.getByText('Beth')).toBeInTheDocument();

        const prevButton = screen.getByLabelText('Previous page');
        expect(prevButton).toBeInTheDocument();

        fireEvent.click(prevButton);

        expect(await screen.findByText('Rick')).toBeInTheDocument();
        expect(screen.getByText('Morty')).toBeInTheDocument();
    });
});