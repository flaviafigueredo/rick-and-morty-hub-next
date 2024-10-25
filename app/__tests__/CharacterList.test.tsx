import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { CharacterList } from '@components/CharacterList';
import { useCharacters } from '../hooks/useCharacters';

global.HTMLElement.prototype.scrollIntoView = jest.fn();

jest.mock('../hooks/useCharacters', () => ({
    useCharacters: jest.fn(),
}));

describe('CharacterList component', () => {
    it('should render \'No characters found.\' when no characters are found', async () => {
        (useCharacters as jest.Mock).mockResolvedValue({
            data: [],
            totalPages: 0,
            error: null,
        });

        render(<CharacterList searchQuery="test" />);

        await waitFor(() => {
            expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
        });
    });

    it('should display loading spinner during search', async () => {
        (useCharacters as jest.Mock).mockReturnValueOnce({
            data: [],
            totalPages: 0,
            error: null,
        });

        render(<CharacterList searchQuery="test" />);

        await waitFor(() => {
            expect(screen.getByRole('status')).toBeInTheDocument();
        });
    });

    it('should display an error message when a search error occurs', async () => {
        (useCharacters as jest.Mock).mockResolvedValueOnce({
            data: [],
            totalPages: 0,
            error: 'Error fetching characters',
        });

        render(<CharacterList searchQuery="test" />);

        await waitFor(() => {
            expect(screen.getByText(/error fetching characters/i)).toBeInTheDocument();
        });
    });

    it('should render characters when the search is successful', async () => {
        const charactersData = [
            { id: 1, name: 'Rick Sanchez', species: 'Human', image: 'rick.jpg' },
            { id: 2, name: 'Morty Smith', species: 'Human', image: 'morty.jpg' },
        ];

        (useCharacters as jest.Mock).mockResolvedValueOnce({
            data: charactersData,
            totalPages: 1,
            error: null,
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
        const mockResult = {
            data: [
                { id: 1, name: 'Rick' },
                { id: 2, name: 'Morty' },
            ],
            totalPages: 2,
        };

        (useCharacters as jest.Mock).mockResolvedValue(mockResult);

        render(<CharacterList searchQuery="" />);

        await waitFor(() => {
            expect(screen.queryByLabelText('Loading content')).not.toBeInTheDocument();
        });

        const nextButton = screen.getByLabelText('Next page');
        const prevButton = screen.getByLabelText('Previous page');

        expect(nextButton).toBeInTheDocument();
        expect(prevButton).toBeInTheDocument();

        fireEvent.click(nextButton);

        const updatedResult = {
            data: [
                { id: 3, name: 'Summer' },
                { id: 4, name: 'Beth' },
            ],
            totalPages: 2,
        };

        (useCharacters as jest.Mock).mockResolvedValueOnce(updatedResult);

        await waitFor(() => {
            expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
            expect(screen.getByLabelText('Next page')).toBeInTheDocument();
        });

        fireEvent.click(prevButton);

        const revertedResult = {
            data: [
                { id: 1, name: 'Rick' },
                { id: 2, name: 'Morty' },
            ],
            totalPages: 2,
        };

        (useCharacters as jest.Mock).mockResolvedValueOnce(revertedResult);

        await waitFor(() => {
            expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
            expect(screen.getByLabelText('Next page')).toBeInTheDocument();
        });
    });
});