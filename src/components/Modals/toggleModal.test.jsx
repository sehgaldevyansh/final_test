import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ActivationModal from "./toggleModal";
import { vi } from "vitest";

describe("ActivationModal component", () => {
  it("renders correctly with the provided message", () => {
    const isOpen = true;
    const message = "Test Message";
    const handleConfirmActivation = vi.fn();
    const handleClose = vi.fn();

    render(
      <ActivationModal
        isOpen={isOpen}
        message={message}
        handleConfirmActivation={handleConfirmActivation}
        handleClose={handleClose}
      />
    );

    expect(screen.getByText("Confirmation")).toBeInTheDocument();
    expect(screen.getByText(`${message}`)).toBeInTheDocument();
  });

  it("calls handleConfirmation with true when 'Yes, Proceed' button is clicked", () => {
    const isOpen = true;
    const message = "Test Message";
    const handleConfirmActivation = vi.fn();
    const handleClose = vi.fn();

    render(
      <ActivationModal
        isOpen={isOpen}
        message={message}
        handleConfirmActivation={handleConfirmActivation}
        handleClose={handleClose}
      />
    );

    fireEvent.click(screen.getByText("Yes, Proceed"));

    expect(handleConfirmActivation).toHaveBeenCalledWith(true);
    expect(handleClose).toHaveBeenCalled();
  });

  it("calls handleConfirmation with false when 'No' button is clicked", () => {
    const isOpen = true;
    const message = "Test Message";
    const handleConfirmActivation = vi.fn();
    const handleClose = vi.fn();

    render(
      <ActivationModal
        isOpen={isOpen}
        message={message}
        handleConfirmActivation={handleConfirmActivation}
        handleClose={handleClose}
      />
    );

    fireEvent.click(screen.getByText("No"));

    expect(handleConfirmActivation).toHaveBeenCalledWith(false);
    expect(handleClose).toHaveBeenCalled();
  });

  it("closes the dialog when 'Cancel' button is clicked", () => {
    const isOpen = true;
    const message = "Test Message";
    const handleConfirmActivation = vi.fn();
    const handleClose = vi.fn();

    render(
      <ActivationModal
        isOpen={isOpen}
        message={message}
        handleConfirmActivation={handleConfirmActivation}
        handleClose={handleClose}
      />
    );

    fireEvent.click(screen.getByTestId("cancel-button")); // Assuming you add a data-testid to the cancel button.

    expect(handleClose).toHaveBeenCalled();
  });


  it("does not render the dialog when isOpen is false", () => {
    const isOpen = false;
    const message = "Test Message";
    const handleConfirmActivation = vi.fn();
    const handleClose = vi.fn();
  
    render(
      <ActivationModal
        isOpen={isOpen}
        message={message}
        handleConfirmActivation={handleConfirmActivation}
        handleClose={handleClose}
      />
    );
  
    // Ensure that the dialog is not present in the document.
    expect(screen.queryByText("Confirmation")).toBeNull();
  });
  
});
