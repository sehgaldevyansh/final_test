import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import FillerModellist from "./FillerModellist";
import userEvent from "@testing-library/user-event";

describe("FillerModelList component", () => {
  it("renders FillerModellist component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerModellist />
        </MemoryRouter>
      </Provider>
    );

    // Assuming that there are specific elements or text you want to check for
    expect(screen.getByText("DCMS Cover")).toBeInTheDocument();
    // Add more assertions based on your component's content
  });

  test("handles search functionality", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerModellist />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Enter Here");

    userEvent.type(searchInput, "example");

    // Wait for the component to re-render after the search
    const consoleSpy = vi.spyOn(console, "log");

    await waitFor(() => {
      // Expect console.log statements to have been called with specific arguments
      expect(console.log).toHaveBeenCalledWith("Search Term:", "example");
      expect(console.log).toHaveBeenCalledWith(
        "Selected Option:",
        expect.any(String) // You can use more specific assertions if needed
      );
      // Add more assertions based on your component's behavior
    });
  });
});
