import { clsx } from "clsx";
import { type ReactNode } from "react";

type SegmentedButtonProps = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  className?: string;
};

export function SegmentedButton({
  children,
  isActive,
  onClick,
  className,
}: SegmentedButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex-1 py-1.5 text-sm font-medium transition-colors duration-200",
        isActive
          ? "bg-primary text-primary-content"
          : "bg-base-200 text-base-content/80 hover:bg-base-300",
        className
      )}
    >
      {children}
    </button>
  );
}
