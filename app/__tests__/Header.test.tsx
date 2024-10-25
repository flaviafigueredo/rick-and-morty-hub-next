import { render, screen, fireEvent } from '@testing-library/react';
import { ReactNode, AnchorHTMLAttributes } from 'react';
import { Header } from '@components/Header';

jest.mock('next/link', () => {
    return ({ children, ...props }: { children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a {...props} aria-label="Go to homepage">{children}</a>
    );
});
jest.mock('next/image', () => (props: any) => <img {...props} />);
jest.mock('@assets/icon.png', () => 'logo.png');

describe('Header component', () => {
    it('should render the header with logo, theme toggle button, and search form', () => {
        const mockOnSearch = jest.fn();

        render(<Header onSearch={mockOnSearch} />);

        const logoImage = screen.getByAltText(/rick and morty logo/i);
        expect(logoImage).toBeInTheDocument();

        const toggleButton = screen.getByLabelText(/toggle theme/i);
        expect(toggleButton).toBeInTheDocument();

        const searchInput = screen.getByLabelText(/character name/i);
        expect(searchInput).toBeInTheDocument();
    });

    it('should call onSearch with an empty string when logo is clicked', () => {
        const mockOnSearch = jest.fn();
        render(<Header onSearch={mockOnSearch} />);

        const logoLink = screen.getByLabelText(/go to homepage/i);

        fireEvent.click(logoLink);

        expect(mockOnSearch).toHaveBeenCalledWith('');
    });

    it('should reflect the correct theme in the toggle button', () => {
        const mockOnSearch = jest.fn();
        render(<Header onSearch={mockOnSearch} />);

        const toggleInput = screen.getByRole('checkbox');

        expect(toggleInput).not.toBeChecked();

        toggleInput.click();
        expect(toggleInput).toBeChecked();

        toggleInput.click();
        expect(toggleInput).not.toBeChecked();
    });
});