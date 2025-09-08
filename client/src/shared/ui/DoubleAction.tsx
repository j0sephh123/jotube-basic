import React from "react";
import { Eye, ListMusic, Edit, Plus } from "lucide-react";
import { Tooltip } from "@shared/ui";
import clsx from "clsx";

type Label =
  | "storyboards"
  | "screenshots"
  | "gallery"
  | "default"
  | "saved"
  | "thumbnails"
  | "playlist";

type Props = {
  label: Label;
  count: number;
  onNavigate: () => void;
  onFirst?: () => void;
  className?: string;
  playlistName?: string;
  playlistId?: number;
  size?: "sm" | "md";
  isActive?: boolean;
};

function tone(label: Label) {
  switch (label) {
    case "storyboards":
      return {
        text: "text-purple-400",
        hover: "hover:bg-purple-500/10",
        bg: "bg-purple-500/5",
        border: "border-purple-500/40",
      };
    case "screenshots":
      return {
        text: "text-blue-400",
        hover: "hover:bg-blue-500/10",
        bg: "bg-blue-500/5",
        border: "border-blue-500/40",
      };
    case "gallery":
      return {
        text: "text-emerald-400",
        hover: "hover:bg-emerald-500/10",
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/40",
      };
    case "saved":
      return {
        text: "text-green-400",
        hover: "hover:bg-green-500/10",
        bg: "bg-green-500/5",
        border: "border-green-500/40",
      };
    case "thumbnails":
      return {
        text: "text-amber-400",
        hover: "hover:bg-amber-500/10",
        bg: "bg-amber-500/5",
        border: "border-amber-500/40",
      };
    case "default":
    default:
      return {
        text: "text-gray-400",
        hover: "hover:bg-gray-500/10",
        bg: "bg-gray-500/5",
        border: "border-gray-500/40",
      };
    case "playlist":
      return {
        text: "text-warning",
        hover: "hover:bg-warning/10",
        bg: "bg-warning/5",
        border: "border-warning/40",
      };
  }
}

function getIcons(label: Label) {
  switch (label) {
    case "storyboards":
      return { first: Eye, second: null };
    case "screenshots":
      return { first: Eye, second: null };
    case "gallery":
      return { first: Eye, second: null };
    case "thumbnails":
      return { first: Eye, second: null };
    case "default":
      return { first: null, second: null };
    case "saved":
      return { first: null, second: null };
    case "playlist":
      return { first: Edit, second: Plus };
    default:
      return { first: null, second: null };
  }
}

export const DoubleAction: React.FC<Props> = ({
  label,
  count,
  onNavigate,
  onFirst,
  className = "",
  playlistName,
  playlistId,
  size = "md",
  isActive = false,
}) => {
  const t = tone(label);
  const icons = getIcons(label);
  const FirstIcon = icons.first;
  const SecondIcon = icons.second;

  if (label === "playlist") {
    const hasPlaylist = playlistName && playlistId;
    const rightIcon = hasPlaylist ? FirstIcon : SecondIcon;

    const isSmall = size === "sm";
    const iconSize = isSmall ? "w-3 h-3" : "w-4 h-4";
    const padding = isSmall ? "px-2 py-1" : "px-3 py-2";
    const textSize = isSmall ? "text-xs" : "text-sm";

    return (
      <div
        className={clsx(
          "inline-flex items-center overflow-hidden rounded-lg border relative",
          isSmall ? "w-auto" : "w-full",
          isActive
            ? "bg-warning/5 border-warning/40"
            : "bg-warning/5 border-warning/40",
          className
        )}
      >
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-warning rounded-l-lg" />
        )}
        <div
          className={clsx(
            "flex items-center gap-1 flex-1 min-w-0 cursor-pointer hover:bg-warning/10 transition-colors rounded-l-lg",
            padding
          )}
          onClick={hasPlaylist ? onNavigate : undefined}
        >
          <ListMusic className={clsx(iconSize, "shrink-0")} />
          {hasPlaylist ? (
            <Tooltip content={playlistName} position="top" color="primary">
              <span className={clsx("truncate", textSize)}>{playlistName}</span>
            </Tooltip>
          ) : null}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFirst?.();
          }}
          className={clsx(
            "flex items-center justify-center hover:bg-warning/10 transition-colors rounded-r-lg border-l border-warning/40",
            padding
          )}
        >
          {rightIcon && React.createElement(rightIcon, { className: iconSize })}
        </button>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "inline-flex items-center overflow-visible rounded-lg w-full border backdrop-blur-sm relative",
        "bg-gray-900/50",
        t.border,
        className
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg" />
      )}
      <div
        className={clsx(
          "px-3 py-2 text-[10px] font-medium uppercase tracking-wide text-center w-20 relative cursor-default hover:underline",
          FirstIcon && "border-r",
          "text-gray-300",
          t.bg,
          t.border
        )}
        onClick={onNavigate}
      >
        <span className="absolute -top-1 -left-1 text-[9px] bg-zinc-600 text-white rounded-full px-1 py-0 leading-tight min-w-4 text-center">
          {count}
        </span>
        {label}
      </div>

      {FirstIcon && onFirst && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFirst();
          }}
          className={clsx(
            "px-3 py-2 flex items-center justify-center w-14 border-r border-gray-700 cursor-pointer hover:bg-gray-600/40 hover:shadow-lg transition-all duration-200",
            "text-gray-400 bg-gray-800/30",
            t.hover
          )}
        >
          <FirstIcon className={clsx("w-4 h-4", t.text)} />
        </button>
      )}
    </div>
  );
};
