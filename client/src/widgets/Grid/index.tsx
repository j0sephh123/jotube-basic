import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  cols?: number;
}>;

export function Grid({ children, cols = 4 }: Props) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4",
        {
          "lg:grid-cols-4": cols === 4,
          "lg:grid-cols-3": cols === 3,
          "lg:grid-cols-2": cols === 2,
          "lg:grid-cols-1": cols === 1,
        }
      )}
    >
      {children}
    </div>
  );
}
