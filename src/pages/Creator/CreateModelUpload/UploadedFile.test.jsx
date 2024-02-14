import { fireEvent, render, screen } from "@testing-library/react";
import UploadedFile from "./UploadedFile";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";

describe("UploadedFile Component", () => {
  const mockFiles = [
    {
      Name: "example_file.csv",
      "Uploaded By": "John Doe",
      "Uploaded On": "2022-01-01",
      "# of rows": 100,
      Description: "Some description",
    },
    // Add more mock data as needed
  ];

  const mockProps = {
    files: mockFiles,
    uploadHeading: "Test Upload Heading",
    uploadedFiledata: {
      data: {
        totalPartsList: mockFiles,
      },
    },
  };

  test("renders component with mock data", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UploadedFile uploadHeading={mockProps.uploadHeading} />
        </MemoryRouter>
      </Provider>
    );

    // Check if the component renders the upload heading
    expect(screen.getByText("Test Upload Heading")).toBeInTheDocument();
  });

  // Add more tests as needed based on the component's behavior
});
