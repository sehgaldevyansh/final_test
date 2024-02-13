// src/pages/Filler/FillerDashboard/ReportType2.test.jsx
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ReportType2 from './ReportType2';

test('renders ReportType2 component with milestones', () => {
  const milestones = {
    milestone1: {
      subTask: {
        subtask1: {
          necessary: 50,
          unnecessary: 30,
        },
      },
      Deadline: '2024-02-01',
    },
    // Add more milestones as needed
  };

  render(<ReportType2 milestones={milestones} />);

  // Add your assertions based on the rendered component.
  expect(screen.getByText('Report Type 2')).toBeInTheDocument();
  expect(screen.getByText('Milestone')).toBeInTheDocument();
  expect(screen.getByText('Subtask')).toBeInTheDocument();
  expect(screen.getByText('Progress')).toBeInTheDocument();

  // You can use `screen` or other utilities from `@testing-library/react` to assert
  // the presence of specific elements or text in your rendered component.

  // Example:
  // expect(screen.getByText('Milestone 1')).toBeInTheDocument();
  // expect(screen.getByText('Subtask 1')).toBeInTheDocument();
  // ...

  // You can also use `screen.debug()` to log the current state of the DOM in the test output.
//   screen.debug();
});

test('renders ReportType2 component with empty milestones', () => {
  const milestones = {};

  render(<ReportType2 milestones={milestones} />);

  // Add assertions to check how the component behaves with an empty milestones object.
  // Example:
  // expect(screen.queryByText('Milestone')).toBeNull();
  // ...

  // You can also use `screen.debug()` to log the current state of the DOM in the test output.
//   screen.debug();
});

test('renders ReportType2 component with multiple milestones and subtasks', () => {
    const milestones = {
      milestone1: {
        subTask: {
          subtask1: {
            necessary: 50,
            unnecessary: 30,
          },
          subtask2: {
            necessary: 40,
            unnecessary: 20,
          },
        },
        Deadline: '2024-02-01',
      },
      milestone2: {
        subTask: {
          subtask3: {
            necessary: 60,
            unnecessary: 25,
          },
          subtask4: {
            necessary: 70,
            unnecessary: 15,
          },
        },
        Deadline: '2024-03-01',
      },
      // Add more milestones as needed
    };
  
    render(<ReportType2 milestones={milestones} />);
  
    // Assertions
    expect(screen.getByText('Report Type 2')).toBeInTheDocument();
    expect(screen.getByText('Milestone')).toBeInTheDocument();
    expect(screen.getByText('Subtask')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  
    // Check milestone 1
    // expect(screen.getByText('Milestone 1')).toBeInTheDocument();
    // expect(screen.getByText('Subtask 1')).toBeInTheDocument();
    // expect(screen.getByText('Subtask 2')).toBeInTheDocument();
    // expect(screen.getByText('Deadline: 2024-02-01')).toBeInTheDocument();
    // expect(screen.getByText('N')).toBeInTheDocument(); // Check for necessary progress
    // expect(screen.getByText('UN')).toBeInTheDocument(); // Check for unnecessary progress
  
    // Check milestone 2
    // expect(screen.getByText('Milestone 2')).toBeInTheDocument();
    // expect(screen.getByText('Subtask 3')).toBeInTheDocument();
    // expect(screen.getByText('Subtask 4')).toBeInTheDocument();
    // expect(screen.getByText('Deadline: 2024-03-01')).toBeInTheDocument();
    // expect(screen.getByText('N')).toBeInTheDocument(); // Check for necessary progress
    // expect(screen.getByText('UN')).toBeInTheDocument(); // Check for unnecessary progress
  
    // Additional assertions as needed
    // Example:
    // expect(screen.getByText('Total Progress: XX%')).toBeInTheDocument();
  
    // You can also use `screen.debug()` to log the current state of the DOM in the test output.
    screen.debug();
  });
  

