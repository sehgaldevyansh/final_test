import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";
import FillerDashboard from "./FillerDashboard";

describe("Filler Dashboard Component", () => {
 
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerDashboard />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Select Block")).toBeInTheDocument();
  });

  // Add more test cases as needed to cover other functionalities and scenarios
});
 