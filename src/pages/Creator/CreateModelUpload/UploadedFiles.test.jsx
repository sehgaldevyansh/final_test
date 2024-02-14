import React from 'react';
import { render, screen } from '@testing-library/react';
import UploadedFiles from './UploadedFiles';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { MemoryRouter } from 'react-router-dom';

// Mock data for testing
const mockFiles = [
  { fileName: 'File1', uploadedBy: 'User1', uploadedOn: '2022-01-01', noOfRows: 100 },
  { fileName: 'File2', uploadedBy: 'User2', uploadedOn: '2022-01-02', noOfRows: 150 },
];

const mockData = {
  file1: ['some content for file 1'],
  file2: [ 'some content for file 2'],
};

describe('UploadedFiles', () => {
  it('renders UploadedFiles component with provided props', () => {
    render(
        <Provider store={store}>
        <MemoryRouter>
        <UploadedFiles files={mockFiles} data={mockData} />)
        </MemoryRouter>
      </Provider>);
    
    // Check if the component renders the correct headings
    expect(screen.getByText('All TPL File(s)')).toBeInTheDocument();
    expect(screen.getByText('People Master File(s)')).toBeInTheDocument();
    expect(screen.getByText('Uncommon Activity Master File(s)')).toBeInTheDocument();

    // Check if the UploadedFile component is rendered for each file
  });

});
