import { describe, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";

describe("Header component", () => {
  it("changes tab on click", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    // Assuming that the Dashboard tab is initially selected
    const modelsTab = screen.getByText("Models");

    fireEvent.click(modelsTab);

    // Check if the tab is selected after the click
    expect(modelsTab).toHaveClass("tab-item-active");
  });

  it("opens menu on button click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

  // Assuming you have a data-testid attribute on the Button component
const button = screen.getByTestId("basic-button");

// Trigger a click on the button
fireEvent.click(button);

// Wait for the menu to open
await screen.findByText("Logout");

// Check if the menu is open
expect(screen.getByText("Logout")).toBeInTheDocument();

  });

  // Add more test cases for other functions in the Header component
});