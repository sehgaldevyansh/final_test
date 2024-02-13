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
    expect(
      screen.getByText("Number of Unique Blocks 5")
    ).toBeInTheDocument();
  });

  // Add more test cases as needed based on additional functionality
});
