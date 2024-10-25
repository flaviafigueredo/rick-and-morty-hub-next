import { BannerImage } from '@components/BannerImage';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

jest.mock('next/image', () => (props: any) => {
    const { priority, ...rest } = props;
    return <img {...rest} />;
});

jest.mock('@assets/banner.png', () => 'banner.png');

describe('BannerImage component', () => {
    it('should render the banner image when pathname is \'/\'', () => {
        (usePathname as jest.Mock).mockReturnValue('/');

        render(<BannerImage />);

        const bannerImage = screen.getByAltText(/rick and morty banner/i);
        expect(bannerImage).toBeInTheDocument();
    });

    it('should not render the banner when pathname is not \'/\'', () => {
        (usePathname as jest.Mock).mockReturnValue('/another-path');

        render(<BannerImage />);

        const bannerImage = screen.queryByAltText(/rick and morty banner/i);
        expect(bannerImage).not.toBeInTheDocument();
    });

    it('should render the \'Get Schwifty!\' SVG text when pathname is \'/\'', () => {
        (usePathname as jest.Mock).mockReturnValue('/');

        render(<BannerImage />);

        const svgText = screen.getByText(/get schwifty!/i);
        expect(svgText).toBeInTheDocument();
    });
});