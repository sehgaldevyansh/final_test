import { describe, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CreateModalUpload from "./CreateModelUpload";
import { store } from "../../../store";

describe("CreateModal component", () => {
  it("renders CreateModalUpload component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateModalUpload />
        </MemoryRouter>
      </Provider>
    );

    // Add assertions to check if the component renders correctly
    // For example, you can check for the presence of specific elements
    expect(screen.getByText("Model Name")).toBeInTheDocument();
    // Add more assertions based on your component structure
  });

  // it("handles cancel click", async () => {
  //   // Render the component
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <CreateModalUpload />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   // Simulate a cancel button click
  //   fireEvent.click(screen.getByText("Cancel"));

  //   // Add assertions related to cancel behavior
  //   // For example, check if the navigation occurred to the expected route
  //   await waitFor(() => {
  //     // Add assertions for the expected behavior after the cancel button click
  //   });
  // });

  // it("handles draft button click", async () => {
  //   // Render the component
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <CreateModalUpload />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   // Simulate a draft button click
  //   fireEvent.click(screen.getByText("Save as Draft"));

  //   // Add assertions related to draft button click behavior
  //   // For example, check if the save as draft action is triggered
  //   await waitFor(() => {
  //     // Add assertions for the expected behavior after the draft button click
  //   });
  // });

  // it("handles submit button click", async () => {
  //   // Render the component
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <CreateModalUpload />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   // Simulate a submit button click
  //   fireEvent.click(screen.getByText("Submit"));

  //   // Add assertions related to submit button click behavior
  //   // For example, check if the submit action is triggered
  //   await waitFor(() => {
  //     // Add assertions for the expected behavior after the submit button click
  //   });
  // });

  // it("handles toggle accordion click", async () => {
  //   // Render the component
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <CreateModalUpload />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   // Simulate a click on the toggle accordion
  //   // Make sure the text is unique and use the appropriate query selector
  //   fireEvent.click(screen.getByText("Upload File & Upload Summary"));

  //   // Add assertions related to toggle accordion behavior
  //   // For example, check if the accordion expands or collapses
  //   await waitFor(() => {
  //     // Add assertions for the expected behavior after the toggle accordion click
  //   });
  // });

// below is failing , find out why?


//   it("handles toggle uploaded files accordion click", async () => {
//     // Render the component
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <CreateModalUpload />
//         </MemoryRouter>
//       </Provider>
//     );

//     // Simulate a click on the toggle uploaded files accordion
//     // Make sure the text is unique and use the appropriate query selector
//     fireEvent.click(screen.getByText("Uploaded Files"));

//     // Add assertions related to toggle uploaded files accordion behavior
//     // For example, check if the accordion expands or collapses
//     await waitFor(() => {
//       // Add assertions for the expected behavior after the toggle uploaded files accordion click
//     });
//   });




//   it("handles file upload", async () => {
//     // Render the component
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <CreateModalUpload />
//         </MemoryRouter>
//       </Provider>
//     );

//     // Simulate file upload
//     // You may need to mock the file input and trigger a change event
//     // For example:
//     // const fileInput = screen.getByLabelText('Upload TPL (CSV File)').querySelector('input');
//     // fireEvent.change(fileInput, { target: { files: [new File([''], 'test.csv')] } });

//     // Add assertions related to file upload behavior
//     await waitFor(() => {
//       // Add assertions for the expected behavior after the file upload
//     });
//   });

  // Add more test cases based on your component's functionality
});
