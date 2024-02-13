import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar Component", () => {
  const mockData = [
    {
      systemName: "System 1",
      blocks: [
        { blockName: "Block 1", variants: [{ variantName: "Variant 1" }] },
      ],
    },
    {
      systemName: "System 2",
      blocks: [
        { blockName: "Block 2", variants: [{ variantName: "Variant 2" }] },
      ],
    },
  ];

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar data={mockData} />)
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("BLOCKS")).toBeInTheDocument();
  });

//   it("expands and collapses system list on click", () => {
//     render(
//         <Provider store={store}>
//           <MemoryRouter>
//             <Sidebar data={mockData} />)
//           </MemoryRouter>
//         </Provider>
//       );
//     fireEvent.click(screen.getByText("System 1"));
//     expect(screen.getByText("Block 1")).toBeInTheDocument();
//     fireEvent.click(screen.getByText("System 1"));
//     expect(screen.queryByText("Block 1")).toBeNull();
//   });

//   it("displays blocks and variants when system is clicked", () => {
//     render(
//         <Provider store={store}>
//           <MemoryRouter>
//             <Sidebar data={mockData} />)
//           </MemoryRouter>
//         </Provider>
//       );
//     fireEvent.click(screen.getByText("System 1"));
//     expect(screen.getByText("Block 1")).toBeInTheDocument();
//     fireEvent.click(screen.getByText("Block 1"));
//     expect(screen.getByText("Variant 1")).toBeInTheDocument();
//   });

//   it("displays parts when variant is clicked", () => {
//     render(
//         <Provider store={store}>
//           <MemoryRouter>
//             <Sidebar data={mockData} />)
//           </MemoryRouter>
//         </Provider>
//       );
//     fireEvent.click(screen.getByText("System 1"));
//     fireEvent.click(screen.getByText("Block 1"));
//     fireEvent.click(screen.getByText("Variant 1"));
//     // Assuming parts are rendered based on data fetched from an API, you may need to mock the API call to test parts rendering.
//     // Verify parts rendering logic here
//   });

  // Add more test cases as needed to cover other functionalities and scenarios
});
 