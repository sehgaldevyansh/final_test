import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../store";
import FillerPreview from "./FillerPreview";
import axios from "axios";
import Cookies from "js-cookie";

// Mocking the modules
vi.mock("axios");
vi.mock("js-cookie");

describe("FillerPreview component", () => {
  beforeEach(() => {
    // Mock necessary values before each test
    axios.mockClear();
    Cookies.get.mockReturnValue('mocked-email');
    Cookies.get.mockReturnValue('mocked-jwtToken');
  });

  it("renders FillerPreview component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerPreview handlePrev={() => {}} />
        </MemoryRouter>
      </Provider>
    );

    // You can add more assertions here to check if the component renders correctly
    expect(screen.getByText("Download Part as CSV")).toBeInTheDocument();
  });



  // Add more test cases for other functions in the FillerPreview component
});
