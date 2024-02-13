import { describe, it, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FillerMain from "./FillerMain";
import { vi } from "vitest";
import axios from "axios";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";
import { API_BASE_URL2 } from "../../../store/Apiconstants";

describe("FillerMain component", () => {
  let consoleSpy;

  beforeEach(() => {
    // Mock console.log for spying
    consoleSpy = vi.spyOn(console, "log");
  });

  afterEach(() => {
    // Restore console.log to its original implementation
    consoleSpy.mockRestore();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerMain />
        </MemoryRouter>
      </Provider>
    );
    // Add assertions to check if the component renders correctly
  });

  it("renders tabs correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerMain />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Step 1: CREATE PARTLIST")).to.exist;
    expect(screen.getByText("Step 2: COMMON/UN-COMMON MAPPING")).to.exist;
    // Add assertions for other tabs
  });

  it("handles next correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerMain />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText("Next"));

    // replace "Step 2 Content" with actual data
    const next = screen.queryByText("Step 2 Content");

    // If it doesn't exist, expect the "There are no records to display" message
    if (!next) {
      expect(
        screen.getByText("There are no records to display")
      ).toBeInTheDocument();
    } else {
      // If "Step 2 Content" exists, expect it to exist
      expect(next).toBeInTheDocument();
    }
  });



  it("changes tabs on tab click", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerMain />
        </MemoryRouter>
      </Provider>
    );

    // Click on the tab
    fireEvent.click(screen.getByText("Step 2: COMMON/UN-COMMON MAPPING"));

    // replace "Step 2 Content" with actual data
    const step2Content = screen.queryByText("Step 2 Content");

    // If it doesn't exist, expect the "There are no records to display" message
    if (!step2Content) {
      expect(
        screen.getByText("There are no records to display")
      ).toBeInTheDocument();
    } else {
      // If "Step 2 Content" exists, expect it to exist
      expect(step2Content).toBeInTheDocument();
    }
  });

  //need data from cookies and jwt token  for axios req testing

  //   it("makes API request on step 3", async () => {
  //     const axiosSpy = vi.spyOn(axios, "get");

  //     render(
  //       <Provider store={store}>
  //         <MemoryRouter>
  //           <FillerMain />
  //         </MemoryRouter>
  //       </Provider>
  //     );
  //     fireEvent.click(screen.getByText("Next", { selector: "button" }));

  //     // Wait for the API request to complete
  //     await waitFor(() => {
  //       // Add assertions to check if the API request was made correctly
  //       expect(axiosSpy).toHaveBeenCalledWith(
  //         `${API_BASE_URL2}/api/msil/generate-TPL/123`,
  //         {
  //           method: "GET",
  //           params: {
  //             user: Cookies.get("email"),
  //           },
  //           headers: {
  //             token: Cookies.get("jwtToken"),
  //             user: Cookies.get("email"),
  //           },
  //         }
  //       );
  //     });

  //     // Restore axios.get to its original implementation
  //     axiosSpy.mockRestore();
  //   });
});
