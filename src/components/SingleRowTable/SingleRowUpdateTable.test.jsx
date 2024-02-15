import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SingleRowUpdateTable from "./SingleRowUpdateTable";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { act } from "react-dom/test-utils";

describe("SingleRowUpdateTable Component", () => {
  const headings = [
    "BOM GName",
    "Block",
    "Level",
    "Parents Part No",
    "DWG Type",
    "PartName",
    "QTY",
    "Sum QTY",
    "A/AR",
  ];
  const dataDetails = {
    baseModel: "Model1",
    block: "Block1",
    level: "Level1",
    parentsPartNo: "123",
    dwgType: "Type1",
    partName: "Part1",
    qty: "1",
    sumQty: "2",
    aar: "A",
  };

  const consoleLogSpy = vi.spyOn(console, "log");

  afterEach(() => {
    // Clear the mock between tests
    consoleLogSpy.mockClear();
  });

  test("renders with provided data details and logs key-value pairs", () => {
    // Render the component
    render(
      <SingleRowUpdateTable
        headings={headings}
        data={[]}
        type="tpl"
        dataDetails={dataDetails}
      />
    );

    // Check if each heading and value is rendered on the screen
    headings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });

    Object.entries(dataDetails).forEach(([key, value]) => {
      if (value === "") {
        expect(screen.getByDisplayValue("")).toBeInTheDocument();
      } else {
        expect(screen.getByText(value)).toBeInTheDocument();
      }
    });

    // Check if console.log has been called only once
    expect(consoleLogSpy).toHaveBeenCalledTimes(10);
  });

  test("renders with provided data details", () => {
    const { getByText, getByDisplayValue } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SingleRowUpdateTable
            headings={headings}
            data={[]}
            type="tpl"
            dataDetails={dataDetails}
          />
        </MemoryRouter>
      </Provider>
    );

    headings.forEach((heading) => {
      expect(getByText(heading)).toBeInTheDocument();
    });

    Object.values(dataDetails).forEach((value) => {
      if (value === "") {
        expect(getByDisplayValue("")).toBeInTheDocument();
      } else {
        expect(getByText(value)).toBeInTheDocument();
      }
    });
  });
});
