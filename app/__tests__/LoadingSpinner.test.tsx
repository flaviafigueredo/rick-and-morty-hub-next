import { render, screen } from "@testing-library/react"
import { LoadingSpinner } from "@components/LoadingSpinner"

jest.mock("next/image", () => (props: any) => <img {...props} />)

describe("LoadingSpinner component", () => {
    it("should render the loading spinner", () => {
        render(<LoadingSpinner />)

        expect(screen.getByLabelText(/loading content/i)).toBeInTheDocument()
    })

    it("should render the gif", () => {
        render(<LoadingSpinner />)

        expect(screen.getByAltText(/loading portal/i)).toBeInTheDocument()
    })
})