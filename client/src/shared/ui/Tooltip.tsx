import { ReactNode } from "react";

export type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  className?: string;
};

export default function Tooltip({
  content,
  children,
  position = "top",
  color = "primary",
  className = "",
}: TooltipProps) {
  const getPositionClass = () => {
    switch (position) {
      case "top":
        return "tooltip-top";
      case "bottom":
        return "tooltip-bottom";
      case "left":
        return "tooltip-left";
      case "right":
        return "tooltip-right";
      default:
        return "tooltip-top";
    }
  };

  const getColorClass = () => {
    switch (color) {
      case "primary":
        return "tooltip-primary";
      case "secondary":
        return "tooltip-secondary";
      case "accent":
        return "tooltip-accent";
      case "info":
        return "tooltip-info";
      case "success":
        return "tooltip-success";
      case "warning":
        return "tooltip-warning";
      case "error":
        return "tooltip-error";
      default:
        return "tooltip-primary";
    }
  };

  return (
    <div
      className={`tooltip ${getPositionClass()} ${getColorClass()} ${className}`}
      data-tip={content}
    >
      {children}
    </div>
  );
}
