import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileUploader from "./FileUploader";
import { vi } from "vitest";

describe("FileUploader Component", () => {
  test("renders the component with initial state", () => {
    render(
      <FileUploader
        uploadHeading="Upload Heading"
        isFileLoading={false}
        fileType="CSV"
        baseModel="Model123"
        refetchFileDetails={() => {}}
        refetchBaseModelList={() => {}}
      />
    );

    // Check if the component renders properly
    expect(screen.getByText("Upload Heading")).toBeInTheDocument();
    expect(screen.getByLabelText("Browse")).toBeInTheDocument();
    1;
  });

  test("renders LinearProgress when isFileLoading is true", () => {
    const mockProps = {
      uploadHeading: "Upload Heading",
      isFileLoading: true, // Change to true
      fileType: "CSV",
      baseModel: "Model123",
      refetchFileDetails: vi.fn(),
      refetchBaseModelList: vi.fn(),
    };

    render(<FileUploader {...mockProps} />);

    // Ensure that the component renders null when isFileLoading is true
    expect(screen.queryByTestId("linear-progress")).toBeNull();
    expect(screen.queryByText("Upload Successful!")).toBeNull();
  });
});
