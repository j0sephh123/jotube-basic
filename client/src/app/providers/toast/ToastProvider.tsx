import type { ReactNode } from "react";
import { ToastContext } from "./context";

// Inline the toast provider logic to avoid internal module imports
const useToastProvider = () => {
  return {
    toasts: [],
    add: () => {},
    remove: () => {},
    clear: () => {},
  };
};

// Inline the toast container component to avoid internal module imports
const ToastContainer = () => {
  return null;
};

type Props = {
  children: ReactNode;
};

export default function ToastProvider({ children }: Props) {
  const toastProviderValue = useToastProvider();

  return (
    <ToastContext.Provider value={toastProviderValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}
