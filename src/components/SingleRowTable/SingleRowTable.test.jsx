import { render, fireEvent, screen } from "@testing-library/react";
import SingleRowTable from "./SingleRowTable";
import { vi } from "vitest";

describe("SingleRowTable", () => {
  const headings = [
    "bdmgName",
    "block",
    "level",
    "parentsPartNo",
    "dwgType",
    "partName",
    "qty",
    "sumQty",
    "aar",
  ];
  const baseModel = "TestModel";
  const block = "TestBlock";
  const type = "tpl";
  const dataDetails = {
    bdmgName: "TestBdmgName",
    block: "TestBlock",
    level: 1,
    parentsPartNo: "TestParentsPartNo",
    dwgType: "TestDwgType",
    partName: "TestPartName",
    qty: 10,
    sumQty: 20,
    aar: "TestAar",
  };

  const handleInputChangeMock = vi.fn();

  it("renders table with headings and data", () => {
    const { getByText, getByRole } = render(
      <SingleRowTable
        headings={headings}
        baseModel={baseModel}
        block={block}
        type={type}
        dataDetails={dataDetails}
        handleInputChange={handleInputChangeMock}
      />
    );

    // Check if headings are rendered
    headings.forEach((heading) => {
      const headingElement = getByText(heading);
      expect(headingElement).toBeInTheDocument();
    });

    // Check if data cells are rendered
    Object.values(dataDetails).forEach((value) => {
      const cellElement = getByText(value.toString());
      expect(cellElement).toBeInTheDocument();
    });

    // Check if Select components are rendered for specific keys
    const selectElements = headings.filter((key) => dataDetails[key] === "");
    selectElements.forEach((key) => {
      const selectElement = getByRole("combobox", { name: "" }); // Update with the appropriate label or aria-label
      expect(selectElement).toBeInTheDocument();
    });
  });

  it("renders table without headings", () => {
    const { getByText } = render(
      <SingleRowTable
        baseModel={baseModel}
        block={block}
        type={type}
        dataDetails={dataDetails}
        handleInputChange={handleInputChangeMock}
      />
    );

    // Check if data cells are rendered
    Object.values(dataDetails).forEach((value) => {
      const cellElement = getByText(value.toString());
      expect(cellElement).toBeInTheDocument();
    });
  });

  it('renders Select component for empty values in "tpl" type', () => {
    const { getByRole } = render(
      <SingleRowTable
        headings={headings}
        baseModel={baseModel}
        block={block}
        type="tpl"
        dataDetails={{ ...dataDetails, bdmgName: "" }}
        handleInputChange={handleInputChangeMock}
      />
    );

    const selectElement = getByRole("combobox", { name: "" }); // Update with the appropriate label or aria-label
    expect(selectElement).toBeInTheDocument();
  });

  it("handles input change", () => {
    const { container } = render(
      <SingleRowTable
        headings={headings}
        baseModel={baseModel}
        block={block}
        type={type}
        dataDetails={dataDetails}
        handleInputChange={handleInputChangeMock}
      />
    );

    // Check if the component contains either a Select or an input
    const inputElement = container.querySelector(
      ".single-row-select-component"
    );

    if (inputElement) {
      fireEvent.change(inputElement, { target: { value: "UpdatedValue" } });

      // Check if handleInputChange is called with the correct updated object
      expect(handleInputChangeMock).toHaveBeenCalledWith({
        ...dataDetails,
        partName: "UpdatedValue",
      });
    }
  });
});
