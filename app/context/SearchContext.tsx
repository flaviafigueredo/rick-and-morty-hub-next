'use client';
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchContextType {
  searchQuery: string;
  handleSearch: (name: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (name: string) => {
    setSearchQuery(name);
    router.push(`/?search=${name}`);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};