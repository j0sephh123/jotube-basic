import { useContext } from "react";
import { ToastContext } from "@app/providers/ToastProvider/index.tsx";

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}
