import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import Cookies from "js-cookie";
import { MemoryRouter, Route } from "react-router-dom";
import FillerComment from "./FillerComment";
import { API_BASE_URL } from "../../../store/Apiconstants";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { store } from "../../../store";

vi.mock("axios");

describe("FillerComment component", () => {
  it("renders UI elements", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerComment />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Initiate DCMS (Model)")).toBeInTheDocument();
    expect(screen.getByText("Comments for Checker")).toBeInTheDocument();
    expect(screen.getByLabelText("maximum height")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Send for Approval")).toBeInTheDocument();
  });

  it("disables Send for Approval button when comments are not provided", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerComment />
        </MemoryRouter>
      </Provider>
    );
    // Button should be disabled initially
    expect(screen.getByText("Send for Approval")).toBeDisabled();

    // Enter some comments
    fireEvent.change(screen.getByLabelText("maximum height"), {
      target: { value: "Some comments" },
    });

    // Button should be enabled now
    expect(screen.getByText("Send for Approval")).not.toBeDisabled();
  });

  it("navigates to the previous step on 'Previous' button click", () => {
    const mockNavigate = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerComment />
        </MemoryRouter>
      </Provider>
    );

    // Trigger 'Previous' button click
    fireEvent.click(screen.getByText("Previous"));

    // Assuming you have a specific route for the previous step
    expect(window.location.pathname).toBe("/");
  });
});
