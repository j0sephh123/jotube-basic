import React from "react";
import { timeAgo } from "@shared/utils";

type Props = {
  value: string;
  label?: string;
  className?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

function formatDate(d: Date) {
  const year = d.getFullYear();
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${month} ${day}, ${year} at ${hh}:${mm}:${ss}`;
}

export const DateDisplay: React.FC<Props> = ({
  value,
  label = "Date",
  className,
}) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return (
      <div
        className={`stat bg-base-100 shadow-sm border border-base-300 ${
          className || ""
        }`}
      >
        <div className="stat-title text-xs uppercase tracking-wider text-base-content/60">
          {label}
        </div>
        <div className="stat-value text-sm text-error">Invalid date</div>
      </div>
    );
  }

  const primary = formatDate(d);
  const relative = timeAgo(d.toISOString());

  return (
    <div
      className={`stat bg-base-100 shadow-sm border border-base-300 ${
        className || ""
      }`}
    >
      <div className="stat-title text-xs uppercase tracking-wider text-base-content/60">
        {label}
      </div>
      <div className="stat-value text-lg font-semibold text-base-content tabular-nums">
        {primary}
      </div>
      <div className="stat-desc">
        <span className="badge badge-outline badge-sm text-base-content/70">
          {relative}
        </span>
      </div>
    </div>
  );
};
