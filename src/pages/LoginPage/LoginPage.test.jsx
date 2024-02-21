import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("landing page", () => {
  it("renders default error state", () => {
    render(<LoginPage />);
    expect(screen.getByTestId("MSIL")).toHaveTextContent("MSIL R&D");
  });

  it("fetches the login info", async () => {
    const response = await fetch(
      "https://www.cf.marutisuzukisubscribe.com/api/partner/v1/sdk-details?apiKey=3ltd5pa3k574vbblodke8ofd5c"
    );

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(await response.json()).toEqual({
      region: "ap-south-1",
      userPoolId: "ap-south-1_8Vwf5ABPq",
      userPoolWebClientId: "3ltd5pa3k574vbblodke8ofd5c",
      gatewayUrl: "https://www.cf.marutisuzukisubscribe.com/",
      authenticationFlowType: "USER_SRP_AUTH",
      authServerUrl: "https://www.cf.marutisuzukisubscribe.com/",
      authServer: "msil-adfs-auth-server.auth.ap-south-1.amazoncognito.com",
      domain: "MSIL-COMMON-AD",
    });
  });
});
