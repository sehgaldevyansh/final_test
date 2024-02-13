import { describe, it, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FillerDeviationMilestone from "./FillerDeviationMilestone";

describe("Header component", () => {
  test("renders without crashing", () => {
    render(
      <FillerDeviationMilestone
        milestoneName="Test Milestone"
        activityList={[]}
        handleDeviationActivityClick={() => {}}
      />
    );
  });
  test("throws prop type warning for missing required props", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Missing milestoneName
    render(
      <FillerDeviationMilestone
        activityList={[]}
        handleDeviationActivityClick={() => {}}
      />
    );
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  test("calls handleDeviationActivityClick on activity click", () => {
    const handleDeviationActivityClickMock = vi.fn();
    const { getByText } = render(
      <FillerDeviationMilestone
        milestoneName="Test Milestone"
        activityList={[
          { activityName: "Activity 1", type: "necessary", deviationType: 0 },
        ]}
        handleDeviationActivityClick={handleDeviationActivityClickMock}
      />
    );

    fireEvent.click(getByText("Activity 1"));
    expect(handleDeviationActivityClickMock).toHaveBeenCalledWith(
      "Test Milestone",
      { activityName: "Activity 1", type: "necessary", deviationType: 0 },
      "necessary"
    );
  });

  // Add more test cases for other functions in the Header component
});
