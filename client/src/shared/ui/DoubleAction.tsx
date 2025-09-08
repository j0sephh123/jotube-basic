import React from "react";
import { ArrowRight, Plus } from "lucide-react";

type Label =
  | "storyboard"
  | "screenshot"
  | "gallery"
  | "default"
  | "saved"
  | "thumbnail";

type Props = {
  label: Label;
  onFirst: () => void;
  onSecond: () => void;
  className?: string;
};

function tone(label: Label) {
  switch (label) {
    case "storyboard":
      return {
        text: "text-purple-400",
        hover: "hover:bg-purple-500/10",
        bg: "bg-purple-500/5",
        border: "border-purple-500/20",
      };
    case "screenshot":
      return {
        text: "text-blue-400",
        hover: "hover:bg-blue-500/10",
        bg: "bg-blue-500/5",
        border: "border-blue-500/20",
      };
    case "gallery":
      return {
        text: "text-emerald-400",
        hover: "hover:bg-emerald-500/10",
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/20",
      };
    case "saved":
      return {
        text: "text-green-400",
        hover: "hover:bg-green-500/10",
        bg: "bg-green-500/5",
        border: "border-green-500/20",
      };
    case "thumbnail":
      return {
        text: "text-amber-400",
        hover: "hover:bg-amber-500/10",
        bg: "bg-amber-500/5",
        border: "border-amber-500/20",
      };
    case "default":
    default:
      return {
        text: "text-gray-400",
        hover: "hover:bg-gray-500/10",
        bg: "bg-gray-500/5",
        border: "border-gray-500/20",
      };
  }
}

export const DoubleAction: React.FC<Props> = ({
  label,
  onFirst,
  onSecond,
  className = "",
}) => {
  const t = tone(label);

  return (
    <div
      className={[
        "inline-flex items-center overflow-hidden rounded-lg",
        "border bg-gray-900/50 backdrop-blur-sm",
        t.border,
        className,
      ].join(" ")}
    >
      <div
        className={[
          "px-3 py-2 text-xs font-medium uppercase tracking-wide",
          "border-r text-gray-300",
          t.bg,
          t.border,
        ].join(" ")}
      >
        {label}
      </div>

      <button
        type="button"
        onClick={onFirst}
        className={[
          "px-3 py-2 flex items-center justify-center",
          "text-gray-400 border-r border-gray-700",
          t.hover,
        ].join(" ")}
      >
        <ArrowRight className={["w-4 h-4", t.text].join(" ")} />
      </button>

      <button
        type="button"
        onClick={onSecond}
        className={[
          "px-3 py-2 flex items-center justify-center",
          "text-gray-400",
          t.hover,
        ].join(" ")}
      >
        <Plus className={["w-4 h-4", t.text].join(" ")} />
      </button>
    </div>
  );
};
