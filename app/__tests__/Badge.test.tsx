import { render, screen } from "@testing-library/react"
import { Badge } from "@components/Badge"

describe("Badge component", () => {
    const testCases: Array<{ type: "status" | "species" | "gender", value: string }> = [
        { type: "status", value: "Alive" },
        { type: "status", value: "Dead" },
        { type: "species", value: "Human" },
        { type: "species", value: "Alien" },
        { type: "gender", value: "Male" },
        { type: "gender", value: "Female" },
    ]

    testCases.forEach(({ type, value }) => {
        it(`should render badge with type ${type} and value ${value}`, () => {
            render(<Badge type={type} value={value} />)

            const badgeElement = screen.getByText(value)
            expect(badgeElement).toBeInTheDocument()
        })
    })
})