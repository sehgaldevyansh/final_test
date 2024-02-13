import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FillerPreviewBreadCrump from "./FillerPreviewBreadCrump";
import { vi } from "vitest";

describe("FillerPreviewBreadCrump Component", () => {
  it("renders with default values", () => {
    render(<FillerPreviewBreadCrump />);
    expect(screen.getByText("Block")).toBeInTheDocument();
  });

  it("renders with null values for system, block, variant, and part", () => {
    render(
      <FillerPreviewBreadCrump
        system={null}
        block={null}
        variant={null}
        part={null}
      />
    );

    // Expect "Block" to be displayed for each Link
    expect(screen.getByText("Block")).toBeInTheDocument();
    expect(screen.getByText("Variant")).toBeInTheDocument();
  });

  it("renders with provided values for system, block, variant, and part", () => {
    render(
      <FillerPreviewBreadCrump
        system="System1"
        block="Block1"
        variant="Variant1"
        part="Part1"
      />
    );

    // Expect custom values to be displayed for each Link
    expect(screen.getByText("(System1)")).toBeInTheDocument();
    expect(screen.getByText("(Block1)")).toBeInTheDocument();
  });

  it('logs a message to the console when "Block" link is clicked', () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<FillerPreviewBreadCrump block="Block1" />);

    fireEvent.click(screen.getByText("(Block1)"));

    // Expect the console.log message to be called
    expect(consoleSpy).toHaveBeenCalledWith("Navigate to variant");

    consoleSpy.mockRestore(); // Restore console.log to its original behavior
  });

  it('logs a message to the console when "Variant" link is clicked', () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<FillerPreviewBreadCrump block="Block1" />);

    fireEvent.click(screen.getByText("(Block1)"));

    // Expect the console.log message to be called
    expect(consoleSpy).toHaveBeenCalledWith("Navigate to variant");

    consoleSpy.mockRestore(); // Restore console.log to its original behavior
  });

  // Add more test cases for other scenarios as needed
});
