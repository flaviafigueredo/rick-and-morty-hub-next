import React, { useEffect, useState } from "react"
import { render, waitFor, screen } from "@testing-library/react"
import { useEpisodes } from "@hooks/useEpisode"
import { api } from "../services/api"
import { Episode } from "types"

jest.mock("../services/api")

const TestComponent: React.FC<{ episodeLinks: string[] }> = ({ episodeLinks }) => {
  const [data, setData] = useState<Episode[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const result = await useEpisodes(episodeLinks)
      if (result.error) {
        setError(result.error)
      } else {
        setData(result.data)
      }
    }

    fetchData()
  }, [episodeLinks])

  if (error) return <div>{error}</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      {data.map((episode: Episode) => (
        <div key={episode.id}>{episode.name}</div>
      ))}
    </div>
  )
}

describe("useEpisodes", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return episode data when the API call is successful", async () => {
    const mockData = [
      { id: 1, name: "Pilot", air_date: "December 2, 2013", episode: "S01E01" },
      { id: 2, name: "Lawnmower Dog", air_date: "December 9, 2013", episode: "S01E02" },
    ];

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData[0] });
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData[1] });

    render(<TestComponent episodeLinks={["/episode/1", "/episode/2"]} />)

    await waitFor(() => expect(screen.getByText(/Pilot/i)).toBeInTheDocument())
    expect(screen.getByText(/Lawnmower Dog/i)).toBeInTheDocument()
    expect(screen.queryByText(/Loading.../i)).toBeNull()
  })

  it("should return an error message when the API call fails", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    render(<TestComponent episodeLinks={["/episode/1"]} />)

    await waitFor(() => expect(screen.getByText(/Network Error/i)).toBeInTheDocument())
    expect(screen.queryByText(/Loading.../i)).toBeNull()
  })

  it("should handle multiple errors correctly", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("Not Found"));
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    render(<TestComponent episodeLinks={["/episode/1", "/episode/2"]} />)

    await waitFor(() => expect(screen.getByText(/Not Found/i)).toBeInTheDocument())
    expect(screen.queryByText(/Loading.../i)).toBeNull()
  })
})