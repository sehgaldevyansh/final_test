import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
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
});
