import { render, screen, waitFor } from "@testing-library/react"
import { Pagination } from "@components/Pagination"
import userEvent from "@testing-library/user-event"

describe("Pagination component", () => {
    it("should render Pagination component with current page and total pages", () => {
        render(<Pagination currentPage={1} totalPages={5} onPageChange={() => { }} />)

        expect(screen.getByText(/page 1 of 5/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/previous page/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/next page/i)).toBeInTheDocument()
    })

    it("should call onPageChange with the previous page when the previous button is clicked", async () => {
        const mockOnPageChange = jest.fn()
        render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />)

        userEvent.click(screen.getByLabelText(/previous page/i))

        await waitFor(() => {
            expect(mockOnPageChange).toHaveBeenCalledWith(1)
        })
    })

    it("should call onPageChange with the next page when the next button is clicked", async () => {
        const mockOnPageChange = jest.fn()
        render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />)

        userEvent.click(screen.getByLabelText(/next page/i))

        await waitFor(() => {
            expect(mockOnPageChange).toHaveBeenCalledWith(3)
        })
    })

    it("should disable the previous button on the first page", () => {
        render(<Pagination currentPage={1} totalPages={5} onPageChange={() => { }} />)

        const previousButton = screen.getByLabelText(/previous page/i)
        expect(previousButton).toBeDisabled()
    })

    it("should disable the next button on the last page", () => {
        render(<Pagination currentPage={5} totalPages={5} onPageChange={() => { }} />)

        const nextButton = screen.getByLabelText(/next page/i)
        expect(nextButton).toBeDisabled()
    })
})