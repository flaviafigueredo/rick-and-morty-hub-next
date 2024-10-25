import { render, screen } from '@testing-library/react';
import { CharacterCard } from '@components/CharacterCard';
import userEvent from '@testing-library/user-event';
import { ReactNode, AnchorHTMLAttributes } from 'react';

jest.mock('next/link', () => {
    return ({ children, passHref, ...props }: { children: ReactNode; passHref?: boolean } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a {...props} href={props.href}>
            {children}
        </a>
    );
});

describe('CharacterCard component', () => {
    const mockCharacter = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    };

    it('should render the character card with the name and image', () => {
        render(<CharacterCard character={mockCharacter} />);

        expect(screen.getByAltText(`${mockCharacter.name} image`)).toBeInTheDocument();
        expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    });

    it('should render the badges with the correct values', () => {
        render(<CharacterCard character={mockCharacter} />);

        expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
        expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
        expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
    });

    it('should navigate to the character details page on click', () => {
        render(<CharacterCard character={mockCharacter} />);

        const cardLink = screen.getByLabelText(`View details of ${mockCharacter.name}`);
        userEvent.click(cardLink);

        expect(cardLink).toHaveAttribute('href', `/character/${mockCharacter.id}`);
    });
});