/* eslint-disable import/no-internal-modules */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router, AppProvider } from "@app/providers";
import "./main.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppProvider>
      <Router />
    </AppProvider>
  </StrictMode>
);
