import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rick and Morty Character Hub",
  description: "Explore the universe of Rick and Morty characters.",
  keywords: "Rick and Morty, characters, animated series, sci-fi, comedy, cartoon",
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
    <html lang="en">
      <body
        className="antialiased">
        {children}
      </body>
    </html>
  );
}
