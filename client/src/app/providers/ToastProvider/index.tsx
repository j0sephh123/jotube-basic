/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode } from "react";
import Toast from "@app/providers/ToastProvider/Toast";
import { useToastProvider } from "@app/providers/ToastProvider/useToastProvider";

type ToastType = "success" | "error" | "info" | "warning";

type ToastOptions = {
  duration?: number;
  type?: ToastType;
};

type ToastContextType = {
  show: (
    message: string | JSX.Element,
    options?: ToastOptions
  ) => `${string}-${string}-${string}-${string}-${string}`;
  successToast: (
    message: string | JSX.Element,
    options?: Omit<ToastOptions, "type">
  ) => `${string}-${string}-${string}-${string}-${string}`;
  errorToast: (
    message: string | JSX.Element,
    options?: Omit<ToastOptions, "type">
  ) => `${string}-${string}-${string}-${string}-${string}`;
  infoToast: (
    message: string | JSX.Element,
    options?: Omit<ToastOptions, "type">
  ) => `${string}-${string}-${string}-${string}-${string}`;
  warningToast: (
    message: string | JSX.Element,
    options?: Omit<ToastOptions, "type">
  ) => `${string}-${string}-${string}-${string}-${string}`;
  remove: (id: `${string}-${string}-${string}-${string}-${string}`) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export type { ToastContextType };

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const {
    toasts,
    show,
    successToast,
    errorToast,
    infoToast,
    warningToast,
    remove,
  } = useToastProvider();

  return (
    <ToastContext.Provider
      value={{
        show,
        successToast,
        errorToast,
        infoToast,
        warningToast,
        remove,
      }}
    >
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.options.type}
          duration={toast.options.duration}
          onClose={() => remove(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
}
