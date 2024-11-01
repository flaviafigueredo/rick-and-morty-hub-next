import type { Metadata } from 'next';
import './globals.css';
import { SearchProvider } from 'context/SearchContext';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

export const metadata: Metadata = {
  title: 'Rick and Morty Character Hub',
  description: 'Explore the universe of Rick and Morty characters.',
  keywords: 'Rick and Morty, characters, animated series, sci-fi, comedy, cartoon',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SearchProvider>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
        </head>
        <body
          className="antialiased">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </SearchProvider>
  );
}
