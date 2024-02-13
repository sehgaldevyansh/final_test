import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PublishConfirmComponent from './PublishConfirmComponent';
import { vi } from 'vitest';

describe('PublishConfirmComponent', () => {
  it('renders correctly', () => {
    const isOpen = true;
    const handleClose = vi.fn();
    const handleProceed = vi.fn();

    render(
      <PublishConfirmComponent
        isOpen={isOpen}
        handleClose={handleClose}
        handleProceed={handleProceed}
      />
    );

    // Check if the title is rendered
    expect(screen.getByText('Publish Model')).toBeInTheDocument();

    // Check if the content is rendered
    expect(screen.getByText('Your model has been PUBLISHED')).toBeInTheDocument();

    // Check if the "Ok, Proceed" button is rendered
    const proceedButton = screen.getByText('Ok, Proceed');
    expect(proceedButton).toBeInTheDocument();
  });

//   it('calls handleProceed when the "Ok, Proceed" button is clicked', () => {
//     const isOpen = true;
//     const handleClose = vi.fn();
//     const handleProceed = vi.fn();
  
//     render(
//       <PublishConfirmComponent
//         isOpen={isOpen}
//         handleClose={handleClose}
//         handleProceed={handleProceed}
//       />
//     );
  
//     // Click the "Ok, Proceed" button
//     userEvent.click(screen.getByText('Ok, Proceed'));
  
//     // Check if handleProceed is called
//     expect(handleProceed.callCount).toBe(1);
  
//     // Check if handleClose is called
//     expect(handleClose.callCount).toBe(1);
//   });
  
  
  
//   it('calls handleClose when the dialog is closed', () => {
//     const isOpen = true;
//     const handleClose = vi.fn();
//     const handleProceed = vi.fn();
  
//     render(
//       <PublishConfirmComponent
//         isOpen={isOpen}
//         handleClose={handleClose}
//         handleProceed={handleProceed}
//       />
//     );
  
//     // Close the dialog
//     fireEvent.click(screen.getByRole('button', { name: /Ok, Proceed/i }));
  
//     // Check if handleClose is called
//     expect(handleClose.called).toBe(true);
  
//     // Check if handleProceed is not called
//     expect(handleProceed.called).toBe(false);
//   });
  
});
