import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { act } from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import CreateModel from "./CreateModel";
import { Provider } from "react-redux";
import { store } from "../../../store";

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

describe("CreateModel Component", () => {
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

  // Add more test cases for different functionalities and scenarios
});
