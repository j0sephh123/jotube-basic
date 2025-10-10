import type { ReactNode } from "react";

type StatType =
  | "default"
  | "saved"
  | "screenshots"
  | "thumbnails"
  | "storyboards";

type ButtonWithBadgeProps = {
  icon: ReactNode;
  text: string;
  numVal?: number;
  onClick: () => void;
  statType?: StatType;
};

const getStatStyle = (statType?: StatType) => {
  switch (statType) {
    case "default":
      return "text-yellow-400 hover:text-yellow-300";
    case "saved":
      return "text-blue-400 hover:text-blue-300";
    case "screenshots":
      return "text-purple-400 hover:text-purple-300";
    case "thumbnails":
      return "text-green-400 hover:text-green-300";
    case "storyboards":
      return "text-red-400 hover:text-red-300";
    default:
      return "text-gray-400 hover:text-gray-300";
  }
};

export default function ButtonWithBadge({
  icon,
  text,
  numVal,
  onClick,
  statType,
}: ButtonWithBadgeProps) {
  const statStyle = getStatStyle(statType);

  return (
    <button
      className="btn btn-sm flex items-center gap-1 px-2 py-1 rounded-md text-sm"
      onClick={onClick}
    >
      <span className={statStyle}>{icon}</span>
      <span className="text-xs">{text}</span>
      {numVal !== undefined && (
        <span className="ml-auto badge badge-sm badge-neutral">{numVal}</span>
      )}
    </button>
  );
}
