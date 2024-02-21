/* v8 ignore start */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";

async function enableMocking() {
  console.log("Trying to enable mocking...");

  // Check if the environment mode is "uat"
  if (import.meta.env.MODE === "dev") {
    try {
      // Attempt to import MSW and start the worker
      const { worker } = await import("./mocks/browser");
      console.log("MSW worker started");
      await worker.start();
      console.log("MSW worker is running");
    } catch (error) {
      console.error("Error starting MSW worker:", error);
    }
  } else {
    console.log("MSW will not be started in this mode:", import.meta.env.MODE);
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <App />
      </Provider>
    </StyledEngineProvider>
  );
});
/* v8 ignore stop */
