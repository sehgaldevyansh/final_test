import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FillerSidebar from "./FillerSidebar";
import sampleData from "./Sample.json";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

describe("FillerSidebar", () => {
  test("displays proper data when searching for a non-existing block", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerSidebar />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Enter Here");
    fireEvent.change(searchInput, { target: { value: "Non-Existing Block" } });

    // Assert that no data is displayed
    expect(screen.queryByText("CS510-")).not.toBeInTheDocument();
    expect(screen.queryByText("CJ020")).not.toBeInTheDocument();
    expect(screen.queryByText("001")).not.toBeInTheDocument();
    expect(
      screen.queryByText("LATCH ASSY,FRONT DOOR,R")
    ).not.toBeInTheDocument();
  });

  test("displays tabs for different steps", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerSidebar />
        </MemoryRouter>
      </Provider>
    );

    // Assert that tabs for different steps are displayed
    expect(screen.getByText("Step 1: BLOCK MAPPING")).toBeInTheDocument();
    expect(screen.getByText("Step 2: GENERAL INFO")).toBeInTheDocument();
    expect(screen.getByText("Step 3: FILL DEVIATION")).toBeInTheDocument();
    expect(screen.getByText("Step 4: PREVIEW")).toBeInTheDocument();
  });
});
