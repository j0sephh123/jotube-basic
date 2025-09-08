import React from "react";
import { Eye } from "lucide-react";

type Label =
  | "storyboard"
  | "screenshot"
  | "gallery"
  | "default"
  | "saved"
  | "thumbnail";

type Props = {
  label: Label;
  count: number;
  onNavigate: () => void;
  onFirst?: () => void;
  className?: string;
};

function tone(label: Label) {
  switch (label) {
    case "storyboard":
      return {
        text: "text-purple-400",
        hover: "hover:bg-purple-500/10",
        bg: "bg-purple-500/5",
        border: "border-purple-500/40",
      };
    case "screenshot":
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
    case "thumbnail":
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
  }
}

function getIcons(label: Label) {
  switch (label) {
    case "storyboard":
      return { first: Eye, second: null };
    case "screenshot":
      return { first: Eye, second: null };
    case "gallery":
      return { first: Eye, second: null };
    case "thumbnail":
      return { first: Eye, second: null };
    case "default":
      return { first: null, second: null };
    case "saved":
      return { first: null, second: null };
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
}) => {
  const t = tone(label);
  const icons = getIcons(label);
  const FirstIcon = icons.first;

  return (
    <div
      className={[
        "inline-flex items-center overflow-visible rounded-lg w-full",
        "border bg-gray-900/50 backdrop-blur-sm",
        t.border,
        className,
      ].join(" ")}
    >
      <div
        className={[
          "px-3 py-2 text-[10px] font-medium uppercase tracking-wide text-center w-20 relative cursor-default hover:underline",
          FirstIcon ? "border-r" : "",
          "text-gray-300",
          t.bg,
          t.border,
        ].join(" ")}
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
          className={[
            "px-3 py-2 flex items-center justify-center w-14",
            "text-gray-400 border-r border-gray-700 bg-gray-800/30 cursor-pointer",
            "hover:bg-gray-600/40 hover:shadow-lg transition-all duration-200",
            t.hover,
          ].join(" ")}
        >
          <FirstIcon className={["w-4 h-4", t.text].join(" ")} />
        </button>
      )}
    </div>
  );
};
