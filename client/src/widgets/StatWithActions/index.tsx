import type React from "react";
import { useState, useRef, useEffect } from "react";

interface StatWithActionsProps {
  label: string;
  value: number;
  layout?: "horizontal" | "vertical";
  leftAction?: {
    icon?: React.ReactNode;
    text?: string;
    tooltip: string;
    onClick: () => void;
  };
  rightAction?: {
    icon?: React.ReactNode;
    text?: string;
    tooltip: string;
    onClick: () => void;
  };
}

interface DelayedTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

function DelayedTooltip({
  content,
  children,
  position = "top",
}: DelayedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "8px",
        };
      case "bottom":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "8px",
        };
      case "left":
        return {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: "8px",
        };
      case "right":
        return {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: "8px",
        };
      default:
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "8px",
        };
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className="absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap"
          style={getPositionStyles()}
        >
          {content}
          <div
            className="absolute w-2 h-2 bg-gray-900 transform rotate-45"
            style={{
              ...(position === "top" && {
                top: "100%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }),
              ...(position === "bottom" && {
                bottom: "100%",
                left: "50%",
                transform: "translateX(-50%) translateY(50%)",
              }),
              ...(position === "left" && {
                left: "100%",
                top: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }),
              ...(position === "right" && {
                right: "100%",
                top: "50%",
                transform: "translateX(50%) translateY(-50%)",
              }),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function StatWithActions({
  label,
  value,
  layout = "horizontal",
  leftAction,
  rightAction,
}: StatWithActionsProps) {
  return (
    <div className="flex items-center gap-0 w-fit bg-base-200 border border-base-300 rounded-lg px-1 py-1 hover:bg-base-100 hover:border-primary/30 transition-all shadow-md">
      {leftAction && (
        <DelayedTooltip content={leftAction.tooltip} position="top">
          <div
            onClick={leftAction.onClick}
            className="flex items-center gap-0 cursor-pointer transition-all duration-200 rounded-l-lg px-2 py-1 hover:text-primary"
          >
            {leftAction.icon && (
              <div className="flex items-center justify-center mr-1">
                {leftAction.icon}
              </div>
            )}
            <div
              className={`min-w-0 ${
                layout === "vertical"
                  ? "flex flex-col items-center gap-0.5"
                  : "flex items-baseline gap-1.5"
              }`}
            >
              <span className="text-sm font-semibold tabular-nums">
                {value.toLocaleString()}
              </span>
              <span className="text-xs truncate">{label}</span>
            </div>
          </div>
        </DelayedTooltip>
      )}

      {!leftAction && (
        <div
          className={`min-w-0 px-2 ${
            layout === "vertical"
              ? "flex flex-col items-center gap-0.5"
              : "flex items-baseline gap-1.5"
          }`}
        >
          <span className="text-sm font-semibold tabular-nums">
            {value.toLocaleString()}
          </span>
          <span className="text-xs text-base-content/60 truncate">{label}</span>
        </div>
      )}

      {rightAction && (
        <DelayedTooltip content={rightAction.tooltip} position="top">
          <button
            onClick={rightAction.onClick}
            className="shrink-0 h-8 w-8 flex items-center justify-center rounded-md hover:bg-primary/20 hover:text-primary cursor-pointer transition-all duration-200"
          >
            {rightAction.text ? (
              <span className="text-xs font-medium">{rightAction.text}</span>
            ) : (
              rightAction.icon
            )}
          </button>
        </DelayedTooltip>
      )}
    </div>
  );
}
