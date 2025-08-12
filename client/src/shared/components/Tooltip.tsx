import { ReactNode } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  color?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  className?: string;
};

export default function Tooltip({
  content,
  children,
  position = "top",
  color = "primary",
  className = "",
}: TooltipProps) {
  return (
    <div
      className={`tooltip tooltip-${position} tooltip-${color} ${className}`}
      data-tip={content}
    >
      {children}
    </div>
  );
}
