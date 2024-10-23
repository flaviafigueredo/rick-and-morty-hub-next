import { render, screen } from "@testing-library/react"
import { Footer } from "@components/Footer"

jest.mock("next/image", () => (props: any) => <img {...props} />)

describe("Footer component", () => {
    it("should render Footer with image", () => {
        render(<Footer />)

        expect(screen.getByAltText(/rick and morty's dog/i)).toBeInTheDocument()
    })

    it("should display the current year in the copyright text", () => {
        render(<Footer />)

        const currentYear = new Date().getFullYear()
        expect(screen.getByText(`Copyright © ${currentYear} - All rights reserved`)).toBeInTheDocument()
    })

    it("should have correct link to the portfolio", () => {
        render(<Footer />)

        const portfolioLink = screen.getByLabelText(/visit Flávia Figueredo's portfolio/i)
        expect(portfolioLink).toHaveAttribute('href', 'https://flaviafigueredo.github.io/portfolio/')
        expect(portfolioLink).toHaveAttribute('target', '_blank')
        expect(portfolioLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
})