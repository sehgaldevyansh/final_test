import { describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CreateModalUpload from "./CreateModelUpload";
import { store } from "../../../store";
import axios from "axios";
import { API_BASE_URL2 } from "../../../store/Apiconstants";

describe("CreateModal component", () => {
  it("renders CreateModalUpload component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateModalUpload />
        </MemoryRouter>
      </Provider>
    );

    // Assertions to check if the component renders correctly
    // For example, checking the presence of specific elements
    expect(screen.getByText("Model Name")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    // Add more assertions based on your component structure
  });

  it("handles cancel click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateModalUpload />
        </MemoryRouter>
      </Provider>
    );

    // Simulate a cancel button click
    fireEvent.click(screen.getByText("Cancel"));
    expect(window.location.pathname).toBe("/");
  });

  // it("handles draft button click", async () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <CreateModalUpload />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   // // Mock a successful response from the API
  //   // axios.post.mockResolvedValueOnce({
  //   //   data: {
  //   //     /* mock response data */
  //   //   },
  //   // });

  //   // Simulate a draft button click
  //   fireEvent.click(screen.getByText("Save as Draft"));

  //   // Assertions for the expected behavior after the draft button click
  //   await waitFor(() => {
  //     // Check if the axios function was called with the expected arguments
  //     expect(axios.post).toHaveBeenCalledWith(
  //       `${API_BASE_URL2}/api/msil/select-base-model`,
  //       {
  //         modelName: "M1",
  //         baseModel: " expected value ",
  //         rowState: 1,
  //         email: "test@kpmg.com",
  //       },
  //       {
  //         headers: {
  //           token: "dcjincijdcnsjik",
  //           user: "guest",
  //         },
  //       }
  //     );

  //     // You may also check if the navigate function was called with the expected argument
  //     expect(window.location.pathname).toBe("/creator/modellist");
  //   });
  // });

  it("handles submit button click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateModalUpload />
        </MemoryRouter>
      </Provider>
    );

    // Simulate a submit button click
    fireEvent.click(screen.getByText("Submit"));

    // Assertions for the expected behavior after the submit button click
    await waitFor(() => {
      // You may check if the submit action is triggered
    });
  });

  it("handles toggle accordion click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateModalUpload />
        </MemoryRouter>
      </Provider>
    );

    // Spy on console.log to check if it's called
    const consoleLogSpy = vi.spyOn(console, "log");

    // Simulate a click on the toggle accordion
    fireEvent.click(screen.getByText("Upload File & Upload Summary"));

    // Assertions for the expected behavior after the toggle accordion click
    await waitFor(() => {
      // Check if the state is toggled
      expect(/* get the state value */).toBe(/* expected value */);

      // Check if console.log is called with the expected message
      expect(consoleLogSpy).toHaveBeenCalledWith("state changed");
    });

    // Clean up the spy
    consoleLogSpy.mockRestore();
  });

  it("handles toggle uploaded files accordion click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateModalUpload />
        </MemoryRouter>
      </Provider>
    );

    // Spy on console.log to check if it's called
    const consoleLogSpy = vi.spyOn(console, "log");

    // Simulate a click on the toggle uploaded files accordion
    fireEvent.click(screen.getByText("Uploaded Files"));

    // Assertions for the expected behavior after the toggle uploaded files accordion click
    await waitFor(() => {
      // Check if the state is toggled
      // Replace with the code that fetches the current state value
      expect(/* get the state value */).toBe(/* expected value */);

      // Check if console.log is called with the expected message
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("state changed")
      );
    });

    // Clean up the spy
    consoleLogSpy.mockRestore();
  });
});
