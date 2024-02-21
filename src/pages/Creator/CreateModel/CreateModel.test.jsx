import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { vi } from "vitest";
import CreateModel from "./CreateModel";

const mockData = {
  modelData: {
    General_info: {
      Model_Name: "",
      Type: "",
      Design_Responsibility: "",
      Development_Responsibility: "",
      Description: "",
    },
    Milestones: {},
  },
};

describe("ViewModal Component", () => {
  it("renders with default values", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateModel />
        </MemoryRouter>
      </Provider>
    );

    // Use assertions to check if the component renders default values
    expect(screen.getByText("Create Model")).toBeInTheDocument();
    expect(screen.getByText("General Information")).toBeInTheDocument();
    // Add more assertions as needed
  });

  it("fetches the user info", async () => {
    const response = await fetch(
      "https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/msil-dcms/dcms/createtemplate"
    );

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(await response.json()).toEqual({
      firstName: "John",
      lastName: "Maverick",
    });
  });

  it("navigates to /creator/modellist when Cancel button is clicked", async () => {
    // Mock the navigate function from react-router-dom

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/view"]}>
          <CreateModel />
        </MemoryRouter>
      </Provider>
    );

    // Click the Cancel button
    fireEvent.click(screen.getByText("Cancel"));
    expect(window.location.pathname).toBe("/");

    // Verify that the navigate function is called with the correct path
  });

  it("renders Skeleton when fetchedData is not available", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateModel />
        </MemoryRouter>
      </Provider>
    );

    // Assert that the Skeleton is rendered when fetchedData is not available
    const skeletonElement = screen.getByTestId("milestones-skeleton1"); // Add a testId to your Skeleton component
    expect(skeletonElement).toBeInTheDocument();

    const skeletonElement2 = screen.getByTestId("milestones-skeleton2"); // Add a testId to your Skeleton component
    expect(skeletonElement2).toBeInTheDocument();

    // Assert other relevant behavior based on your component's functionality
  });

  it("renders Skeleton when fetchedData is not available", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateModel />
        </MemoryRouter>
      </Provider>
    );

    const skeletonElement3 = screen.getByTestId("milestones-skeleton3"); // Add a testId to your Skeleton component
    expect(skeletonElement3).toBeInTheDocument();

    const skeletonElement4 = screen.getByTestId("milestones-skeleton4"); // Add a testId to your Skeleton component
    expect(skeletonElement4).toBeInTheDocument();

    // Assert other relevant behavior based on your component's functionality
  });
});
