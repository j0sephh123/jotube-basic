import type { ReactNode } from "react";
import clsx from "clsx";

type PlaylistTableColProps = {
  children: ReactNode;
  className?: string;
};

export default function PlaylistTableCol({ children, className }: PlaylistTableColProps) {
  return <td className={clsx(className)}>{children}</td>;
}
