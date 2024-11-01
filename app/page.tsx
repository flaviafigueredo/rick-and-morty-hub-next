'use client';
import React, { useState } from 'react';
import { BannerImage } from '@components/BannerImage';
import { CharacterList } from '@components/CharacterList';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { useSearch } from 'context/SearchContext';

const Home: React.FC = () => {
  const { searchQuery } = useSearch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <BannerImage />
      <main>
        <CharacterList searchQuery={searchQuery} />
      </main>
    </>
  );
};

export default Home;