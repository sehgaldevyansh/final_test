import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StepperComponent from "./StepperComponent";
import { vi, describe, it } from "vitest";
import { renderHook } from "@testing-library/react";

// Mock data for testing
const mockVariantList = ["Variant1", "Variant2", "Variant3"];
const mockBaseModelList = ["Model1", "Model2", "Model3"];

describe("StepperComponent", () => {
  it("should update selected button based on keyRefresh", () => {
    // Mock initial values
    const initialKeyRefresh = 1;

    // Render the component with initial values
    const { rerender } = render(
      <StepperComponent
        variantList={mockVariantList}
        baseModelList={mockBaseModelList}
        keyRefresh={initialKeyRefresh}
      />
    );

    // Print the component structure for debugging
    console.log(screen.debug());

    // Ensure that the selected button is updated based on initial keyRefresh
    console.log("Selected button after rendering:", initialKeyRefresh);
    expect(screen.getByText(mockVariantList[initialKeyRefresh])).toHaveStyle({
      backgroundColor: "actual_color",
    });

    // Update keyRefresh and rerender the component
    const updatedKeyRefresh = 2;
    rerender(
      <StepperComponent
        variantList={mockVariantList}
        baseModelList={mockBaseModelList}
        keyRefresh={updatedKeyRefresh}
      />
    );

    // Print the component structure for debugging
    console.log(screen.debug());

    // Ensure that the selected button is updated based on the updated keyRefresh
    console.log(
      "Selected button after updating keyRefresh:",
      updatedKeyRefresh
    );
    expect(screen.getByText(mockVariantList[updatedKeyRefresh])).toHaveStyle({
      backgroundColor: "actual_color",
    });
  });

  it("renders StepperComponent with provided props", () => {
    render(
      <StepperComponent
        variantList={mockVariantList}
        baseModelList={mockBaseModelList}
      />
    );

    // Check if the component renders the correct number of tabs
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(mockVariantList.length);

    // Check if the tabs display the correct variant names
    mockVariantList.forEach((variant, index) => {
      expect(screen.getByText(variant)).toBeInTheDocument();
    });

    // Check if the tabs display the correct base model names
    mockBaseModelList.forEach((baseModel, index) => {
      expect(screen.getByText(`(${baseModel})`)).toBeInTheDocument();
    });
  });

  it("selects the correct tab based on keyRefresh prop", () => {
    const keyRefresh = 2;

    render(
      <StepperComponent
        variantList={mockVariantList}
        baseModelList={mockBaseModelList}
        keyRefresh={keyRefresh}
      />
    );

    // Print the document structure to debug
    console.log(screen.debug());

    // Continue with your existing assertions
  });
});
