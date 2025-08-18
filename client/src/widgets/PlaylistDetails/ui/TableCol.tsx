import { ReactNode } from "react";
import clsx from "clsx";

type TableColProps = {
  children: ReactNode;
  className?: string;
};

export default function TableCol({ children, className }: TableColProps) {
  return <td className={clsx(className)}>{children}</td>;
}
