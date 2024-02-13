import { describe, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FillerBreadCrump from "./FillerBreadCrump";
import { vi } from "vitest";

describe("FillerBreadCrump component", () => {
  it("renders without crashing", () => {
    render(<FillerBreadCrump />);
    // Add assertions to check if the component renders correctly
  });

  it("renders with block information", () => {
    const block = { blockName: "TestBlock" };
    render(<FillerBreadCrump block={block} />);
    expect(screen.getByText("(TestBlock)")).to.exist;
  });

  it("renders with variant information", () => {
    const variant = { variantName: "TestVariant" };
    render(<FillerBreadCrump variant={variant} />);
    expect(screen.getByText("(TestVariant)")).to.exist;
  });

  it("renders with part information", () => {
    const part = "TestPart";
    render(<FillerBreadCrump part={part} />);
    expect(screen.getByText("(TestPart)")).to.exist;
  });

  it("handles block click event", () => {
    const block = { blockName: "TestBlock" };

    // Spy on console.log
    const consoleSpy = vi.spyOn(console, "log");

    render(<FillerBreadCrump block={block} />);

    // Trigger a click on the block link
    fireEvent.click(screen.getByText("General Information for Block"));

    // Check if console.log was called with the expected message
    expect(consoleSpy).toHaveBeenCalledWith("Navigate to block");

    // Clean up the spy
    consoleSpy.mockRestore();
  });

  it("handles variant click event", () => {
    const variant = { variantName: "TestVariant" };
    const consoleSpy = vi.spyOn(console, "log");

    render(<FillerBreadCrump variant={variant} />);

    fireEvent.click(screen.getByText("(TestVariant)"));

    expect(consoleSpy).toHaveBeenCalledWith("Navigate to variant");

    consoleSpy.mockRestore();

    // Add assertions to check if the click event is handled correctly
  });

  // Add more test cases for other functions in the FillerBreadCrump component
});
