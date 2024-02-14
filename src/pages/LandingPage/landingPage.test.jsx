import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "./LandingPage";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import { store } from "../../store";

describe("LandingPage component", () => {
  it("renders LandingPage component", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    // Assert that the main heading and subheading are rendered
    expect(screen.getByText("MSIL R&D")).toBeInTheDocument();
    expect(screen.getByTestId("landing-page-subheading")).toHaveTextContent(
      "Design Change Management System"
    );
    // Add more assertions based on your component's structure
  });

  it("does not render Create / Edit Model Flow card for filler", () => {
    // Mock userData with filler role
    const mockUserData = {
      results: {
        divisionalPMG: false,
        filler: true,
      },
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage userData={mockUserData} />
        </MemoryRouter>
      </Provider>
    );

    // Assert that the "Create / Edit Model Flow" card is not rendered for filler
    expect(screen.queryByText("Create / Edit Model Flow")).toBeNull();
  });

  it("does not render Filler Activity Flow card for divisionalPMG", () => {
    // Mock userData with divisionalPMG role
    const mockUserData = {
      results: {
        divisionalPMG: true,
        filler: false,
      },
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage userData={mockUserData} />
        </MemoryRouter>
      </Provider>
    );

    // Assert that the "Filler Activity Flow" card is not rendered for divisionalPMG
    expect(screen.queryByText("Filler Activity Flow")).toBeNull();
  });

  // Add more test cases based on your component's functionality and behavior
});
