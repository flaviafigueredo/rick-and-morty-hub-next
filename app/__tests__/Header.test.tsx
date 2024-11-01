import { render, screen, fireEvent, act } from '@testing-library/react';
import { ReactNode, AnchorHTMLAttributes } from 'react';
import { Header } from '@components/Header';
import { SearchProvider } from 'context/SearchContext';
import { useRouter } from 'next/navigation';

jest.mock('next/link', () => {
    return ({ children, ...props }: { children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a {...props} aria-label="Go to homepage">{children}</a>
    );
});
jest.mock('next/image', () => (props: any) => <img {...props} />);
jest.mock('@assets/icon.png', () => 'logo.png');

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Header component', () => {
    it('should render the header with logo, theme toggle button, and search form', () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        });

        render(
            <SearchProvider>
                <Header />
            </SearchProvider>
        );

        const logoImage = screen.getByAltText(/rick and morty logo/i);
        expect(logoImage).toBeInTheDocument();

        const toggleButton = screen.getByLabelText(/toggle theme/i);
        expect(toggleButton).toBeInTheDocument();

        const searchInput = screen.getByLabelText(/character name/i);
        expect(searchInput).toBeInTheDocument();
    });

    it('should call handleSearch with an empty string when logo is clicked', () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        });

        render(
            <SearchProvider>
                <Header />
            </SearchProvider>
        );

        const logoLink = screen.getByLabelText(/go to homepage/i);

        fireEvent.click(logoLink);

        expect(pushMock).toHaveBeenCalledWith('/?search=');
    });

    it('should reflect the correct theme in the toggle button', () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        });

        render(
            <SearchProvider>
                <Header />
            </SearchProvider>
        );

        const toggleInput = screen.getByRole('checkbox');

        expect(toggleInput).not.toBeChecked();

        act(() => {
            toggleInput.click();
        });
        expect(toggleInput).toBeChecked();

        act(() => {
            toggleInput.click();
        });
        expect(toggleInput).not.toBeChecked();
    });
});