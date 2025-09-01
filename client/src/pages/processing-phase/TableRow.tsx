import type { ReactNode } from "react";

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="hover">{children}</tr>;
}
