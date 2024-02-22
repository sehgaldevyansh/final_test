import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { vi } from "vitest";
import FillerBlockVariantMapping from "./FillerBlockVariantMapping";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";

describe("FillerActivityFilling", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerBlockVariantMapping />
        </MemoryRouter>
      </Provider>
    );
    // You can add more specific assertions if needed
    expect(screen.getByText("Search:")).toBeInTheDocument();
  });

  //   it("displays correct model details", async () => {
  //     render(<FillerActivityFilling />);
  //     // Replace the text with the actual model details based on the mock data
  //     expect(screen.getByText("Mock Model")).toBeInTheDocument();
  //     expect(screen.getByText("Mock BaseModel")).toBeInTheDocument();
  //   });

  //   it("displays the correct total blocks count", async () => {
  //     render(<FillerActivityFilling />);

  //     // Assuming that the "Total Blocks" text is present in the rendered component
  //     const totalBlocksText = screen.getByText(/Total Blocks/i);

  //     // Wait for the component to update (if there are asynchronous operations)
  //     await vi.waitFor(() => {
  //       // Get the sibling span element with fontWeight: "400"
  //       const totalBlocksValue = totalBlocksText.nextElementSibling;

  //       // Assert that the totalBlocksValue contains the correct value
  //       expect(totalBlocksValue).toHaveTextContent("2");
  //     });
  //   });

  //   it("handles search functionality for baseModel", async () => {
  //     const logSpy = vi.spyOn(console, "log");

  //     render(<FillerActivityFilling />);

  //     // Select "Base Model" from the dropdown
  //     const searchDropdown = screen.getByLabelText("Search:");
  //     fireEvent.change(searchDropdown, { target: { value: "baseModel" } });

  //     // Type user input
  //     const searchInput = screen.getByPlaceholderText("Enter value to search");
  //     fireEvent.change(searchInput, { target: { value: "Mock Base Model2" } });

  //     // Wait for the component to re-render after the search
  //     await waitFor(() => {
  //       expect(logSpy).toHaveBeenCalledWith("Search Term:", "Mock Base Model2");
  //       expect(logSpy).toHaveBeenCalledWith("Selected Option:", "baseModel");

  //       // Add more assertions based on your component's behavior

  //       // Check if the filtered data is updated correctly based on the search term and option
  //       // You can use Vitest's `expect` function for assertions on the DOM
  //       // For example: expect(screen.getByText("Mock Base Model2")).toBeTruthy();
  //       // Make sure to replace this with actual assertions based on your component's behavior
  //     });

  //     logSpy.mockRestore();
  //   });

  //   it("handles search functionality for Blocks", async () => {
  //     const logSpy = vi.spyOn(console, "log");

  //     render(<FillerActivityFilling />);

  //     // Select "Blocks" from the dropdown
  //     const searchDropdown = screen.getByLabelText("Search:");
  //     fireEvent.change(searchDropdown, { target: { value: "blockCode" } });

  //     // Type user input
  //     const searchInput = screen.getByPlaceholderText("Enter value to search");
  //     fireEvent.change(searchInput, { target: { value: "Block2" } });

  //     // Wait for the component to re-render after the search
  //     await waitFor(() => {
  //       expect(logSpy).toHaveBeenCalledWith("Search Term:", "Block2");
  //       expect(logSpy).toHaveBeenCalledWith("Selected Option:", "blockCode");

  //       // Add more assertions based on your component's behavior

  //       // Check if the filtered data is updated correctly based on the search term and option
  //       // You can use Vitest's `expect` function for assertions on the DOM
  //       // For example: expect(screen.getByText("Block2")).toBeTruthy();
  //       // Make sure to replace this with actual assertions based on your component's behavior
  //     });

  //     logSpy.mockRestore();
  //   });
});
