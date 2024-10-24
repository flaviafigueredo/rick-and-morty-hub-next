import { render, screen } from "@testing-library/react"
import { SearchForm } from "@components/SearchForm"
import userEvent from "@testing-library/user-event"

describe("SearchForm component", () => {
    it("should render search form with input and button", () => {
        const mockOnSearch = jest.fn()

        render(<SearchForm onSearch={mockOnSearch} />)

        expect(screen.getByLabelText(/character name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/search/i)).toBeInTheDocument()
    })

    it("should call onSearch function when search button is clicked", async () => {
        const mockOnSearch = jest.fn()

        render(<SearchForm onSearch={mockOnSearch} />)

        const input = screen.getByLabelText(/character name/i)
        await userEvent.type(input, "Rick")

        const searchButton = screen.getByLabelText(/search/i)
        await userEvent.click(searchButton)

        expect(mockOnSearch).toHaveBeenCalledWith("Rick")
    })

    it("should not call onSearch if input is empty", async () => {
        const mockOnSearch = jest.fn()

        render(<SearchForm onSearch={mockOnSearch} />)

        const searchButton = screen.getByLabelText(/search/i)
        await userEvent.click(searchButton)

        expect(mockOnSearch).not.toHaveBeenCalled()
    })

    it("should clear the input after submitting", async () => {
        const mockOnSearch = jest.fn()

        render(<SearchForm onSearch={mockOnSearch} />)
    
        const input = screen.getByLabelText(/character name/i)
        await userEvent.type(input, "Morty")

        const searchButton = screen.getByLabelText(/search/i)
        await userEvent.click(searchButton)
    
        expect(input).toHaveValue("")
    })

    it("should call onSearch when pressing enter key", async () => {
        const mockOnSearch = jest.fn()

        render(<SearchForm onSearch={mockOnSearch} />)
    
        const input = screen.getByLabelText(/character name/i)
        await userEvent.type(input, "Summer{enter}") 
    
        expect(mockOnSearch).toHaveBeenCalledWith("Summer")
    })

    it("should not call onSearch if input is only whitespace", async () => {
        const mockOnSearch = jest.fn()

        render(<SearchForm onSearch={mockOnSearch} />)
    
        const input = screen.getByLabelText(/character name/i)
        await userEvent.type(input, "   ")

        const searchButton = screen.getByLabelText(/search/i)
        await userEvent.click(searchButton)
    
        expect(mockOnSearch).not.toHaveBeenCalled()
    })
})