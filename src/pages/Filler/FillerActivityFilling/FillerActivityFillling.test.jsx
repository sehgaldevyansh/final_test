import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import FillerActivityFilling from "./FillerActivityFilling";
import { vi } from "vitest";

// Mocking react-router-dom
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: () => ({ id: "mocked-id" }),
  useNavigate: vi.fn(),
}));

vi.mock("../../../store", () => ({
  ...vi.importActual("../../../store"),
  useFetchBlockListsQuery: vi.fn(() => ({
    data: { data: [] },
    error: null,
    isLoading: false,
    refetch: vi.fn(),
  })),
  useFetchBaseModelByModelIdQuery: vi.fn(() => ({
    data: { data: { modelName: "Mock Model", baseModel: "Mock BaseModel" } },
    error: null,
  })),
  useUpdateCheckedBlockListMutation: vi.fn(() => [vi.fn(), {}]),
  useUpdateDraftBlockListMutation: vi.fn(() => [vi.fn(), {}]),
}));

describe("FillerActivityFilling", () => {
  it("renders without crashing", () => {
    render(<FillerActivityFilling />);
    // You can add more specific assertions if needed
    expect(screen.getByText("Search:")).toBeInTheDocument();
  });

  it("handles search correctly", async () => {
    render(<FillerActivityFilling />);
    const searchInput = screen.getByPlaceholderText("Enter value to search");

    // Spy on console.log
    const consoleLogSpy = vi.spyOn(console, "log");

    // Change the input value
    fireEvent.change(searchInput, { target: { value: "MockValue" } });

    // Check if handleSearch function is called
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("event!", expect.any(Object));
    });

    // Restore the spy after the test to avoid interference with other tests
    consoleLogSpy.mockRestore();
  });

  //   it("handles switch change correctly", async () => {
  //     render(<FillerActivityFilling />);
  //     const switchElement = screen.getByTestId("your-switch-testid");

  //     fireEvent.click(switchElement);

  //     // Ensure that the handleSwitchChange function is called
  //     await waitFor(() => {
  //       expect(screen.getByText("Status Updated")).toBeInTheDocument();
  //     });
  //   });

  //   it("handles save as draft correctly", async () => {
  //     render(<FillerActivityFilling />);
  //     const saveAsDraftButton = screen.getByText("Save as Draft");

  //     fireEvent.click(saveAsDraftButton);

  //     // Ensure that the handleSaveAsDraft function is called
  //     await waitFor(() => {
  //       expect(screen.getByText("Draft Saved")).toBeInTheDocument();
  //     });
  //   });

  // Add more test cases as needed for other functionalities and UI elements
});
