import React from "react";
import { render, screen } from "@testing-library/react";
import FillerPreviewDeviationComponent from "./FillerPreviewDeviationComponent";

describe("FillerPreviewDeviationComponent", () => {
  const detailedData = {
    activityList: [
      {
        activityName: "Activity 1",
        causeOfChange: "Cause 1",
      },
      {
        activityName: "Activity 2",
        causeOfChange: "Cause 2",
      },
    ],
  };
  const deviationReason = "Sample Deviation Reason";

  it("renders component with data", () => {
    render(
      <FillerPreviewDeviationComponent
        detailedData={detailedData}
        deviationReason={deviationReason}
      />
    );

    // Check if activity information is rendered
    detailedData.activityList.forEach((data) => {
      expect(screen.getByText(data.causeOfChange)).toBeInTheDocument();
    });
  });

  it("renders component without block information", () => {
    render(
      <FillerPreviewDeviationComponent
        detailedData={detailedData}
        deviationReason={deviationReason}
      />
    );

    // Check if activity information is rendered
    detailedData.activityList.forEach((data) => {
      expect(screen.getByText(data.activityName)).toBeInTheDocument();
      expect(screen.getByText(data.causeOfChange)).toBeInTheDocument();
    });
  });
});
