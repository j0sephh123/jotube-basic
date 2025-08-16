import { createContext } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type ToastOptions = {
  duration?: number;
  type?: ToastType;
};

type ToastContextType = {
  show: (message: string | JSX.Element, options?: ToastOptions) => number;
  remove: (id: number) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
