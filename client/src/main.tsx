import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "@/app/router";
import "./main.css";
import AppProvider from "./app/providers/AppProvider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppProvider>
      <Router />
    </AppProvider>
  </StrictMode>
);
