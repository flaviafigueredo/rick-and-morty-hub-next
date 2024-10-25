'use client';
import React, { useState } from 'react';
import { Header } from '@components/Header';
import { BannerImage } from '@components/BannerImage';
import { CharacterList } from '@components/CharacterList';
import { Footer } from '@components/Footer';
import { LoadingSpinner } from '@components/LoadingSpinner';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (name: string) => {
    setSearchQuery(name);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <BannerImage />
      <main>
        <CharacterList searchQuery={searchQuery} />
      </main>
      <Footer />
    </>
  );
};

export default Home;