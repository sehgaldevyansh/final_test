// PercentFill.test.jsx

import React from "react";
import { render } from "@testing-library/react";
import PercentFill from "./PercentFill";

describe("PercentFill", () => {
  test("renders PercentFill component with necessary and unnecessary percentages", () => {
    const { getByText } = render(
      <PercentFill
        necessaryPercentage={50}
        unnecessaryPercentage={30}
        necessary={5}
        unnecessary={10}
      />
    );

    expect(getByText("5 N")).toBeInTheDocument();
    expect(getByText("10 UN")).toBeInTheDocument();

    const necessaryProgressBar = document.querySelector(
      ".progress-bar.necessary"
    );
    expect(necessaryProgressBar).toHaveStyle({ width: "50%" });

    const unnecessaryProgressBar = document.querySelector(
      ".progress-bar.unnecessary"
    );
    expect(unnecessaryProgressBar).toHaveStyle({ width: "30%" });
  });

  test("renders PercentFill component with 0 percentages", () => {
    const { getByText } = render(
      <PercentFill
        necessaryPercentage={0}
        unnecessaryPercentage={0}
        necessary={0}
        unnecessary={0}
      />
    );

    expect(getByText("0 N")).toBeInTheDocument();
    expect(getByText("0 UN")).toBeInTheDocument();

    const necessaryProgressBar = document.querySelector(
      ".progress-bar.necessary"
    );
    expect(necessaryProgressBar).toHaveStyle({ width: "0%" });

    const unnecessaryProgressBar = document.querySelector(
      ".progress-bar.unnecessary"
    );
    expect(unnecessaryProgressBar).toHaveStyle({ width: "0%" });
  });

  test("renders PercentFill component with 100 percentages", () => {
    const { getByText } = render(
      <PercentFill
        necessaryPercentage={100}
        unnecessaryPercentage={100}
        necessary={15}
        unnecessary={20}
      />
    );

    expect(getByText("15 N")).toBeInTheDocument();
    expect(getByText("20 UN")).toBeInTheDocument();

    const necessaryProgressBar = document.querySelector(
      ".progress-bar.necessary"
    );
    expect(necessaryProgressBar).toHaveStyle({ width: "100%" });

    const unnecessaryProgressBar = document.querySelector(
      ".progress-bar.unnecessary"
    );
    expect(unnecessaryProgressBar).toHaveStyle({ width: "100%" });
  });

  test("renders PercentFill component with maximum values", () => {
    const { getByText } = render(
      <PercentFill
        necessaryPercentage={999}
        unnecessaryPercentage={999}
        necessary={999}
        unnecessary={999}
      />
    );

    expect(getByText("999 N")).toBeInTheDocument();
    expect(getByText("999 UN")).toBeInTheDocument();

    const necessaryProgressBar = document.querySelector(
      ".progress-bar.necessary"
    );
    expect(necessaryProgressBar).toHaveStyle({ width: "999%" });

    const unnecessaryProgressBar = document.querySelector(
      ".progress-bar.unnecessary"
    );
    expect(unnecessaryProgressBar).toHaveStyle({ width: "999%" });
  });

  test("renders PercentFill component with negative percentages", () => {
    const { getByText } = render(
      <PercentFill
        necessaryPercentage={-10}
        unnecessaryPercentage={-20}
        necessary={-5}
        unnecessary={-10}
      />
    );

    expect(getByText("-5 N")).toBeInTheDocument();
    expect(getByText("-10 UN")).toBeInTheDocument();

    const necessaryProgressBar = document.querySelector(
      ".progress-bar.necessary"
    );
    expect(necessaryProgressBar).toHaveStyle({ width: "-10%" });

    const unnecessaryProgressBar = document.querySelector(
      ".progress-bar.unnecessary"
    );
    expect(unnecessaryProgressBar).toHaveStyle({ width: "-20%" });
  });

  test("renders PercentFill component with necessary exceeding 100%", () => {
    const { getByText } = render(
      <PercentFill
        necessaryPercentage={150}
        unnecessaryPercentage={30}
        necessary={20}
        unnecessary={10}
      />
    );

    expect(getByText("20 N")).toBeInTheDocument();
    expect(getByText("10 UN")).toBeInTheDocument();

    const necessaryProgressBar = document.querySelector(
      ".progress-bar.necessary"
    );
    expect(necessaryProgressBar).toHaveStyle({ width: "150%" });

    const unnecessaryProgressBar = document.querySelector(
      ".progress-bar.unnecessary"
    );
    expect(unnecessaryProgressBar).toHaveStyle({ width: "30%" });
  });

  test("renders PercentFill component with unnecessary exceeding 100%", () => {
    const { getByText } = render(
      <PercentFill
        necessaryPercentage={50}
        unnecessaryPercentage={120}
        necessary={5}
        unnecessary={30}
      />
    );

    expect(getByText("5 N")).toBeInTheDocument();
    expect(getByText("30 UN")).toBeInTheDocument();

    const necessaryProgressBar = document.querySelector(
      ".progress-bar.necessary"
    );
    expect(necessaryProgressBar).toHaveStyle({ width: "50%" });

    const unnecessaryProgressBar = document.querySelector(
      ".progress-bar.unnecessary"
    );
    expect(unnecessaryProgressBar).toHaveStyle({ width: "120%" });
  });

  // Add more test cases as needed
});
