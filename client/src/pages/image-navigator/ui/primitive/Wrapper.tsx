import type { PropsWithChildren } from "react";

export default function Wrapper({ children }: PropsWithChildren) {
  return <div className="container mx-auto p-6">{children}</div>;
}
