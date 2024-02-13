import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";
import { vi } from 'vitest';
import FillerModellist from "./FillerModellist";

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

 

  // Add more test cases based on the functionality of your component
});
