import { render, screen } from "@testing-library/react";
import SummaryComponent from "./SummaryComponent";

describe("SummaryComponent", () => {
  it("renders with provided heading, number of rows, and number of unique blocks", () => {
    render(
      <SummaryComponent
        heading="Test Heading"
        numberOfRows={10}
        numberOfUniqueBlocks={5}
      />
    );

    // Check if the component renders with the correct heading
    expect(screen.getByText("Test Heading")).toBeInTheDocument();

    // Check if the component renders with the correct number of rows and unique blocks
    expect(screen.getByText("Number of Rows 10")).toBeInTheDocument();
    expect(screen.getByText("Number of Unique Blocks 5")).toBeInTheDocument();
  });

  it("renders with default values if not provided", () => {
    render(<SummaryComponent />);

    // Check if the component renders with default heading and counts
    expect(screen.getByText("Number of Rows")).toBeInTheDocument();
    expect(screen.getByText("Number of Unique Blocks")).toBeInTheDocument();
  });

  it("renders with null values", () => {
    render(
      <SummaryComponent
        heading={null}
        numberOfRows={null}
        numberOfUniqueBlocks={null}
      />
    );

    // Check if the component renders with null values
    expect(screen.getByText("Number of Rows")).toBeInTheDocument();
    expect(screen.getByText("Number of Unique Blocks")).toBeInTheDocument();
  });

  it("renders with negative number of rows", () => {
    render(
      <SummaryComponent
        heading="Negative Rows"
        numberOfRows={-5}
        numberOfUniqueBlocks={2}
      />
    );

    // Check if the component renders with negative number of rows
    expect(screen.getByText("Negative Rows")).toBeInTheDocument();
    expect(screen.getByText("Number of Rows -5")).toBeInTheDocument();
    expect(screen.getByText("Number of Unique Blocks 2")).toBeInTheDocument();
  });

  // Add more test cases as needed based on additional functionality
});
