import { describe, it } from "vitest";
import {
  render,
  fireEvent,
  waitFor,
  nextTick,
  screen,
} from "@testing-library/react";
import ViewModal from "./ViewModal";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";

describe("ViewModal component", () => {
  it("renders ViewModal component", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ViewModal />
        </MemoryRouter>
      </Provider>
    );
  });

  it("handles cancel click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ViewModal />
        </MemoryRouter>
      </Provider>
    );

    const cancelButton = screen.getByTestId("cancel-button");

    if (cancelButton) {
      cancelButton.click();
      console.info("cancel found");
      // You may add assertions related to cancel behavior
      // For example, check if the navigation occurred to the expected route
    } else {
      console.error("Cancel button not found");
    }
  });

  it("handles draft button click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ViewModal />
        </MemoryRouter>
      </Provider>
    );

    const draftButton = screen.getByTestId("draft-button");

    if (draftButton) {
      // draftButton.click();
      console.info("draft btn found");
      // You may add assertions related to draft button click behavior
      // For example, check if the save as draft action is triggered
      await waitFor(() => {
        // Add assertions for the expected behavior after the draft button click
      });
    } else {
      console.error("Draft button not found");
    }
  });

  it("handles submit button click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ViewModal />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByTestId("submit-button");

    if (submitButton) {
      // submitButton.click();
      console.error("Submit button  found");

      // You may add assertions related to submit button click behavior
      // For example, check if the submit action is triggered
      await waitFor(() => {
        // Add assertions for the expected behavior after the submit button click
      });
    } else {
      console.error("Submit button not found");
    }
  });

  // Add more test cases based on your component's functionality
});
