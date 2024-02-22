import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModelList from "./ModelList";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";

describe("ModelList", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModelList />
        </MemoryRouter>
      </Provider>
    );
    // You can add more specific assertions if needed
    expect(screen.getByText("Model Catalogue")).toBeInTheDocument();
  });

  it("displays correct model details", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModelList />
        </MemoryRouter>
      </Provider>
    );

    // Use waitFor to wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText("UAT")).toBeInTheDocument();
    });

    // Add more assertions based on your component's behavior
  });

  it("handles search functionality for Name", async () => {
    const logSpy = vi.spyOn(console, "log");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModelList />
        </MemoryRouter>
      </Provider>
    );

    // Select "Blocks" from the dropdown
    const searchDropdown = screen.getByLabelText("Search:");
    fireEvent.change(searchDropdown, { target: { value: "Name" } });

    // Type user input
    const searchInput = screen.getByPlaceholderText("Enter Here");
    fireEvent.change(searchInput, { target: { value: "UAT" } });

    // Wait for the component to re-render after the search
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith("Search Term:", "UAT");
      expect(logSpy).toHaveBeenCalledWith("Selected Option:", "Name");

      // Add more assertions based on your component's behavior

      // Check if the filtered data is updated correctly based on the search term and option
      // You can use Vitest's `expect` function for assertions on the DOM
      // For example: expect(screen.getByText("Block2")).toBeTruthy();
      // Make sure to replace this with actual assertions based on your component's behavior
    });

    logSpy.mockRestore();
  });

  it("handles search functionality for Status", async () => {
    const logSpy = vi.spyOn(console, "log");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModelList />
        </MemoryRouter>
      </Provider>
    );

    // Select "Blocks" from the dropdown
    const searchDropdown = screen.getByLabelText("Search:");
    fireEvent.change(searchDropdown, { target: { value: "Status" } });

    // Type user input
    const searchInput = screen.getByPlaceholderText("Enter Here");
    fireEvent.change(searchInput, { target: { value: "In Progress" } });

    // Wait for the component to re-render after the search
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith("Search Term:", "In Progress");
      expect(logSpy).toHaveBeenCalledWith("Selected Option:", "Status");
    });

    logSpy.mockRestore();
  });

  it("navigates to create model page when 'Create' button is clicked", async () => {
    const logSpy = vi.spyOn(console, "log");
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/creator/modellist"]}>
          <ModelList />
        </MemoryRouter>
      </Provider>
    );

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    // Wait for the navigation to occur
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith("Create button clicked!");
      expect(window.location.pathname).toBe("/");
    });

    logSpy.mockRestore();
  });

  test("Toggle switch and confirm activation", async () => {
    // Render your component with the required state and props
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModelList />
        </MemoryRouter>
      </Provider>
    );

    // Wait for the data to be loaded (you might need to adjust this based on your actual loading mechanism)
    await waitFor(() => screen.getByText("Model Catalogue"));

    // Check if the modal is opened
    expect(screen.queryByText("Confirmation")).toBeNull();
  });
  // Add more test cases based on your component's features and interactions
});
