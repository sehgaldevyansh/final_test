// LandingPage.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import LandingPage from "./LandingPage";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import { store } from "../../store";

describe("LandingPage component", () => {
  it("renders LandingPage component", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    // Add assertions based on the rendered component
    // For example, you can check if certain elements are present
    expect(screen.getByText("MSIL R&D")).toBeInTheDocument();
    expect(screen.getByTestId("landing-page-subheading")).toHaveTextContent(
      "Design Change Management System"
    );
    // Add more assertions based on your component's structure
  });

//   it("fetches and sets token in cookies on component mount", async () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <LandingPage />
//         </MemoryRouter>
//       </Provider>
//     );

//     // Ensure that the getToken function is called
//     await waitFor(() =>
//       expect(loginClient.getToken).toHaveBeenCalledTimes(1)
//     );

//     // Check if the token and email are set in cookies
//     expect(Cookies.get("jwtToken")).toBe("mockToken");
//     expect(Cookies.get("email")).toBe("test@example.com");
//   });



  // Add more test cases based on your component's functionality and behavior
});
