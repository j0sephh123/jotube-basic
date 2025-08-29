import { type PropsWithChildren } from "react";
import GQLProvider from "./GQLProvider";
import RestProvider from "./RestProvider";

export default function AppProvider({
  children,
}: PropsWithChildren) {
  return (
    <GQLProvider>
      <RestProvider>{children}</RestProvider>
    </GQLProvider>
  );
}
