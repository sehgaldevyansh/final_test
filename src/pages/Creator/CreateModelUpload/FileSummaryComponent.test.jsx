import React from 'react';
import { render, screen } from '@testing-library/react';
import FileSummaryComponent from './FileSummaryComponent';

describe('FileSummaryComponent', () => {
  const mockProps = {
    heading: 'Test Heading',
    noOfRows: 10,
    fileProperty: 'Test Property',
    noOfBlocks: 5,
    issuesIdentified: 'Test Issues Identified',
    errorDataInfo: [
      { blockNo: 'Block1', errorMsg: 'Error1', cellNo: 'A1', errorData: 'Invalid data' },
      { blockNo: 'Block1', errorMsg: 'Error2', cellNo: 'B2', errorData: 'Invalid data' },
    ],
  };

  it('renders component with provided props', () => {
    render(<FileSummaryComponent {...mockProps} />);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
    expect(screen.getByText('Issues Identified')).toBeInTheDocument();
  });

 

  it('displays success message if errorDataInfo is empty', () => {
    const propsWithoutErrors = { ...mockProps, errorDataInfo: [] };
    render(<FileSummaryComponent {...propsWithoutErrors} />);
    expect(screen.getByText('Upload Successful')).toBeInTheDocument();
  });

  it('displays error message if errorMessage is provided', () => {
    const propsWithErrorMessage = { ...mockProps, errorMessage: 'Test Error Message' };
    render(<FileSummaryComponent {...propsWithErrorMessage} />);
    expect(screen.getByText('Test Error Message')).toBeInTheDocument();
  });
});
