import { ToastProvider } from "./ToastProvider";
import GQLProvider from "./GQLProvider";
import RestProvider from "./RestProvider";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <GQLProvider>
        <RestProvider>{children}</RestProvider>
      </GQLProvider>
    </ToastProvider>
  );
}