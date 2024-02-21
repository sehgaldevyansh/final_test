import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavigationPathComponent from "./NavigationPathComponent";

describe("NavigationPathComponent", () => {
  const paths = [
    { name: "Home", path: "/home" },
    { name: "Products", path: "/products" },
    { name: "Details", path: "/details" },
  ];
  const current = "Current Page";

  it("renders the component with breadcrumbs", () => {
    render(
      <MemoryRouter>
        <NavigationPathComponent paths={paths} current={current} />
      </MemoryRouter>
    );

    // Check if all links and the current page are present
    paths.forEach((path, index) => {
      const linkElement = screen.getByTestId(`breadcrumb-link-${index}`);
      expect(linkElement).toBeInTheDocument();
    });

    const currentElement = screen.getByText(current);
    expect(currentElement).toBeInTheDocument();
  });

  it("renders with a custom separator", () => {
    render(
      <MemoryRouter>
        <NavigationPathComponent paths={paths} current={current} />
      </MemoryRouter>
    );

    // Check if the total number of separators is equal to (number of paths - 1)
    const separatorElements = screen.getAllByText("›");
    expect(separatorElements.length).toBe(paths.length);
  });

  it("renders with default text for missing paths", () => {
    render(
      <MemoryRouter>
        <NavigationPathComponent current={current} />
      </MemoryRouter>
    );

    // Check if only the current page is present
    const currentElement = screen.getByText(current);
    expect(currentElement).toBeInTheDocument();
  });
});
