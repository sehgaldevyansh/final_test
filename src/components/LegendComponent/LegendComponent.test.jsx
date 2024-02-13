import { render, screen } from "@testing-library/react";
import LegendComponent from "./LegendComponent";

describe("LegendComponent", () => {
  test("renders LegendComponent with main text and legend items", () => {
    const mainText = "Legend Title";
    const legendItems = [
      { color: "red", legendText: "Category 1" },
      { color: "blue", legendText: "Category 2", border: "1px solid #000" },
    ];

    render(<LegendComponent mainText={mainText} legendItems={legendItems} />);

    // Assertions
    expect(screen.getByText(mainText)).toBeInTheDocument();

    legendItems.forEach((legendItem) => {
      expect(screen.getByText(legendItem.legendText)).toBeInTheDocument();
    //   expect(screen.getByTestId("legend-dot-" + legendItem.legendText)).toBeInTheDocument();
    });
  });

  test("renders LegendComponent with no legend items", () => {
    const mainText = "No Legend Items";
    const legendItems = [];

    render(<LegendComponent mainText={mainText} legendItems={legendItems} />);

    // Assertions
    expect(screen.getByText(mainText)).toBeInTheDocument();
    expect(screen.queryByTestId("legend-dot")).toBeNull();
  });

  test("renders LegendComponent with different legend items", () => {
    const mainText = "Different Legend Items";
    const legendItems = [
      { color: "green", legendText: "Category A" },
      { color: "yellow", legendText: "Category B" },
      { color: "purple", legendText: "Category C" },
    ];

    render(<LegendComponent mainText={mainText} legendItems={legendItems} />);

    // Assertions
    expect(screen.getByText(mainText)).toBeInTheDocument();

    legendItems.forEach((legendItem) => {
      expect(screen.getByText(legendItem.legendText)).toBeInTheDocument();
    //   expect(screen.getByTestId("legend-dot-" + legendItem.legendText)).toBeInTheDocument();
    });
  });
});
