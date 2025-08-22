import type { ReactNode } from "react";
import { ToastContext } from "./context";
import { useToastProvider } from "./model/useToastProvider";
import ToastContainer from "./components/ToastContainer";

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
