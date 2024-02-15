import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";
import FillerDashboard from "./FillerDashboard";
import { vi } from "vitest";
import { act } from "react-dom/test-utils";
import {
  fetchAllBaseModelByEmail,
  fetchAllBlockByEmailAndBaseSystem,
  fetchAllCommonUncommList,
  fetchAllSystemByEmailAndBase,
} from "./api";

vi.mock("./api", () => ({
  fetchAllBaseModelByEmail: vi.fn(),
  fetchAllSystemByEmailAndBase: vi.fn(),
  fetchAllBlockByEmailAndBaseSystem: vi.fn(),
  fetchAllCommonUncommList: vi.fn(),
}));

describe("Filler Dashboard Component", () => {
  beforeEach(() => {
    // Mocking the API responses
    fetchAllBaseModelByEmail.mockResolvedValue({
      data: ["Model1", "Model2"],
    });
    fetchAllSystemByEmailAndBase.mockResolvedValue({
      data: ["System1", "System2"],
    });
    fetchAllBlockByEmailAndBaseSystem.mockResolvedValue({
      data: ["Block1", "Block2"],
    });
    fetchAllCommonUncommList.mockResolvedValue({
      data: {
        common: 10,
        uncommon: 5,
        nA: 2,
        necessary: 8,
        commonMonitoringReq: 3,
      },
    });
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FillerDashboard />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Select Block")).toBeInTheDocument();
  });
});
