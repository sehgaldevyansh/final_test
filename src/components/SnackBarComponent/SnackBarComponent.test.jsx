import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SnackBarComponent from './SnackBarComponent';
import { vi } from 'vitest';

describe('SnackBarComponent', () => {

it('renders with success message and closes on button click', async () => {
    const handleClose = vi.fn();
    const msg = 'This is a success message';
    const isOpen = true;
  
    render(
      <SnackBarComponent
        handleClose={handleClose}
        msg={msg}
        isOpen={isOpen}
        position={{ vertical: 'bottom', horizontal: 'left' }}
      />
    );
  
    // Check if the success message is displayed
    expect(screen.getByText(msg)).toBeInTheDocument();
  
    // Check if the close button is present
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
  
    // Click the close button
    userEvent.click(closeButton);
  
    // Wait for the snackbar to close
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  
    const snackbar = screen.getByRole('alert');
    expect(snackbar).toHaveStyle('visibility: visible');
  });
  

  it('renders with custom position', () => {
    const handleClose = vi.fn();
    const msg = 'Custom position test';
    const isOpen = true;
    const position = { vertical: 'top', horizontal: 'right' };

    render(
      <SnackBarComponent
        handleClose={handleClose}
        msg={msg}
        isOpen={isOpen}
        position={position}
      />
    );

    // Check if the success message is displayed
    expect(screen.getByText(msg)).toBeInTheDocument();

    // Check if the snackbar is positioned correctly
    const snackbar = screen.getByRole('alert');
    expect(snackbar).toHaveStyle(`top: ${position.vertical};`);
    expect(snackbar).toHaveStyle(`right: ${position.horizontal};`);
  });
});
