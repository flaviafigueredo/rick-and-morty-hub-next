import { render, screen } from "@testing-library/react"
import { ErrorMessage } from "@components/ErrorMessage"

describe("ErrorMessage component", () => {
    it("should render ErrorMessage component with the correct message", () => {
        const errorMessage = "An unexpected error occurred"
        
        render(<ErrorMessage message={errorMessage} />)

        expect(screen.getByRole("alert")).toBeInTheDocument()
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
})