import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ButtonLogin } from "./ButtonLogin";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";

describe("ButtonLogin", () => {
  test("renders ButtonLogin with default properties", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ButtonLogin />
        </MemoryRouter>
      </Provider>
    );
    // Add assertions based on the default rendering
    // Example:
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });

  test("renders ButtonLogin with custom property1", () => {
    const customProperty1 = "custom";
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ButtonLogin property1={customProperty1} />
        </MemoryRouter>
      </Provider>
    );
    // Add assertions based on the custom property1
    // Example:
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });

  test("applies styles correctly on mouse enter", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ButtonLogin />
        </MemoryRouter>
      </Provider>
    );
    const button = screen.getByText("LOGIN");

    button.dispatchEvent(new MouseEvent("mouseenter"));

    // Add assertions based on the expected styles after mouse enter
    // Example:
    expect(button).toHaveClass(
      " [ font-family:'Inter',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-[22px] font-medium text-center leading-[normal] relative"
    );
  });

  test("applies styles correctly on mouse leave", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ButtonLogin />
        </MemoryRouter>
      </Provider>
    );
    const button = screen.getByText("LOGIN");

    button.dispatchEvent(new MouseEvent("mouseenter"));
    button.dispatchEvent(new MouseEvent("mouseleave"));

    // Add assertions based on the expected styles after mouse leave
    // Example:
    expect(button).toHaveClass(
      " [ font-family:'Inter',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-[22px] font-medium text-center leading-[normal] relative"
    );
  });

  // Add more test cases as needed
});
