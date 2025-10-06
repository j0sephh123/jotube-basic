import type { ReactNode } from "react";

type ButtonWithBadgeProps = {
  icon: ReactNode;
  text: string;
  numVal?: number;
  onClick: () => void;
};

export default function ButtonWithBadge({
  icon,
  text,
  numVal,
  onClick,
}: ButtonWithBadgeProps) {
  return (
    <button
      className="btn btn-sm flex items-center gap-1 px-2 py-1 rounded-md text-sm"
      onClick={onClick}
    >
      {icon}
      <span className="text-xs">{text}</span>
      {numVal !== undefined && (
        <span className="ml-auto badge badge-xs badge-info">{numVal}</span>
      )}
    </button>
  );
}
