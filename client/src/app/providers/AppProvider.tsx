import { ToastProvider } from "@app/providers/toast";
import GQLProvider from "@app/providers/GQLProvider";
import RestProvider from "@app/providers/RestProvider";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <GQLProvider>
        <RestProvider>{children}</RestProvider>
      </GQLProvider>
    </ToastProvider>
  );
}
