import React, { useEffect, useState } from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { useCharacterDetail } from '@hooks/useCharacterDetail';
import { api } from '../services/api';
import { Character } from 'types';

jest.mock('../services/api');

const TestComponent: React.FC<{ characterID: number }> = ({ characterID }) => {
  const [data, setData] = useState<Character | null | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await useCharacterDetail(characterID);
      if (result.error) {
        setError(result.error);
      } else {
        setData(result.data);
      }
    };

    fetchData();
  }, [characterID]);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Species: {data.species}</p>
    </div>
  );
};

describe('useCharacterDetail', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return character data when the API call is successful', async () => {
    const mockData = { id: 1, name: 'Rick Sanchez', species: 'Human' };

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<TestComponent characterID={1} />);

    await waitFor(() => expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument());
    expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
    expect(screen.queryByText(/Loading.../i)).toBeNull();
  });

  it('should return an error message when the character is not found', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Character not found'));

    render(<TestComponent characterID={999} />);

    await waitFor(() => expect(screen.getByText(/Character not found/i)).toBeInTheDocument());
    expect(screen.queryByText(/Loading.../i)).toBeNull();
  });

  it('should return a generic error message for other errors', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<TestComponent characterID={1} />);

    await waitFor(() => expect(screen.getByText(/Network Error/i)).toBeInTheDocument());
    expect(screen.queryByText(/Loading.../i)).toBeNull();
  });
});