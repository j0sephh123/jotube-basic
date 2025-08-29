import { type PropsWithChildren } from "react";
import GQLProvider from "./GQLProvider";
import RestProvider from "./RestProvider";
import { ToastProvider } from "@radix-ui/react-toast";

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <GQLProvider>
      <RestProvider>
        <ToastProvider>{children}</ToastProvider>
      </RestProvider>
    </GQLProvider>
  );
}
