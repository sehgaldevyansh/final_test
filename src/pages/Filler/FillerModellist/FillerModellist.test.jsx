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

  it("fetches the user info", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerModellist />
        </MemoryRouter>
      </Provider>
    );
    const response = await fetch(
      "https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/msil-dcms/dcms/dcms/filler/all-model"
    );

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");

    await screen.findByText("Model1");

    // Check if the data is rendered correctly
    expect(screen.getByText("Model Name")).toBeInTheDocument();
  });

  test("handles search functionality for Name", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerModellist />
        </MemoryRouter>
      </Provider>
    );
    // Select "Name" from the dropdown
    const searchDropdown = screen.getByLabelText("Search:");
    fireEvent.change(searchDropdown, { target: { value: "Name" } });

    // Type user input
    const searchInput = screen.getByPlaceholderText("Enter Here");
    userEvent.type(searchInput, "Model1");

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("Search Term:", "Model1");
      expect(console.log).toHaveBeenCalledWith("Selected Option:", "Name");
      // Add more assertions based on your component's behaviora
      expect(screen.getByText("Model1")).toBeInTheDocument();
    });
  });

  test("handles search functionality for Edited By", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerModellist />
        </MemoryRouter>
      </Provider>
    );

    // Select "Edited By" from the dropdown
    const searchDropdown = screen.getByLabelText("Search:");
    fireEvent.change(searchDropdown, { target: { value: "Edited By" } });

    // Type user input
    const searchInput = screen.getByPlaceholderText("Enter Here");
    userEvent.type(searchInput, "User1");

    // Wait for the component to re-render after the search
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("Search Term:", "User1");
      expect(console.log).toHaveBeenCalledWith("Selected Option:", "Edited By");
      // Add more assertions based on your component's behavior
      expect(screen.getByText("User1")).toBeInTheDocument();
    });
  });

  test("handles search functionality for Level", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerModellist />
        </MemoryRouter>
      </Provider>
    );

    // Select "Level" from the dropdown
    const searchDropdown = screen.getByLabelText("Search:");
    fireEvent.change(searchDropdown, { target: { value: "Level" } });

    // Type user input
    const searchInput = screen.getByPlaceholderText("Enter Here");
    userEvent.type(searchInput, "Type1");

    // Wait for the component to re-render after the search
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("Search Term:", "Type1");
      expect(console.log).toHaveBeenCalledWith("Selected Option:", "Level");
      // Add more assertions based on your component's behavior
      expect(screen.getByText("Type1")).toBeInTheDocument();
    });
  });
});
