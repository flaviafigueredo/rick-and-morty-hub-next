import React, { useEffect, useState } from "react"
import { render, waitFor, screen } from "@testing-library/react"
import { useCharacters } from "@hooks/useCharacters"
import { api } from "../services/api"
import { Character } from "types"

jest.mock("../services/api")

const TestComponent: React.FC<{ pageID: number; nameFilter?: string }> = ({ pageID, nameFilter }) => {
  const [data, setData] = useState<Character[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const result = await useCharacters(pageID, nameFilter)
      if (result.error) {
        setError(result.error)
      } else {
        setData(result.data)
      }
    }

    fetchData()
  }, [pageID, nameFilter])

  if (error) return <div>{error}</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      {data.map((character: Character) => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  )
}

describe("useCharacters", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return characters data when the API call is successful", async () => {
    const mockData = {
      results: [
        { id: 1, name: "Rick Sanchez", species: "Human" },
        { id: 2, name: "Morty Smith", species: "Human" },
      ],
      info: { pages: 2 },
    };

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData })

    render(<TestComponent pageID={1} />)

    await waitFor(() => expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument())
    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument()
    expect(screen.queryByText(/Loading.../i)).toBeNull()
  })

  it("should return an error message when character is not found", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce({
      response: { status: 404 },
    });

    render(<TestComponent pageID={1} />)

    await waitFor(() => expect(screen.getByText(/Character not found. Please try again./i)).toBeInTheDocument())
    expect(screen.queryByText(/Loading.../i)).toBeNull()
  })

  it("should return a generic error message for other errors", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    render(<TestComponent pageID={1} />)

    await waitFor(() => expect(screen.getByText(/Network Error/i)).toBeInTheDocument())
    expect(screen.queryByText(/Loading.../i)).toBeNull()
  })

  it("should handle name filtering correctly", async () => {
    const mockData = {
      results: [{ id: 1, name: "Rick Sanchez", species: "Human" }],
      info: { pages: 1 },
    };

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData })

    render(<TestComponent pageID={1} nameFilter="Rick" />)

    await waitFor(() => expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument())
    expect(screen.queryByText(/Loading.../i)).toBeNull()
  })
})