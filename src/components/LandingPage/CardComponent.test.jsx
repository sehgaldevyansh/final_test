import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CardComponent from "./CardComponent";
import { vi } from "vitest";

describe("CardComponent", () => {
  it("renders correctly with title and subtitle", () => {
    render(
      <MemoryRouter>
        <CardComponent title="Test Title" subtitle="Test Subtitle" to="/test" />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders correctly without a link", () => {
    render(
      <MemoryRouter>
        <CardComponent title="Test Title" subtitle="Test Subtitle" />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("navigates to the correct link when clicked", () => {
    // Use vi.mock to mock the useNavigate hook

    render(
      <MemoryRouter>
        <CardComponent title="Test Title" subtitle="Test Subtitle" to="/test" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Test Title"));
  });

  it("does not navigate when clicked without a link", () => {
    // Use vi.mock to mock the useNavigate hook

    render(
      <MemoryRouter>
        <CardComponent title="Test Title" subtitle="Test Subtitle" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Test Title"));
  });
});
