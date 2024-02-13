import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SingleRowUpdateTable from "./SingleRowUpdateTable";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";

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
