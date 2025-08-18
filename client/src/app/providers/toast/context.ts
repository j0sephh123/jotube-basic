import { createContext } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type ToastOptions = {
  duration?: number;
  type?: ToastType;
};

type ToastI = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  message: string | JSX.Element;
  options: ToastOptions;
};

export type ToastContextType = {
  toasts: Array<ToastI>;
  show: (message: string | JSX.Element, options?: ToastOptions) => string;
  successToast: (
    message: string | JSX.Element,
    options?: Omit<ToastOptions, "type">
  ) => string;
  errorToast: (
    message: string | JSX.Element,
    options?: Omit<ToastOptions, "type">
  ) => string;
  infoToast: (
    message: string | JSX.Element,
    options?: Omit<ToastOptions, "type">
  ) => string;
  warningToast: (
    message: string | JSX.Element,
    options?: Omit<ToastOptions, "type">
  ) => string;
  remove: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);
