import React from "react";
import { timeAgo } from "@shared/utils";
import clsx from "clsx";

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
  const primary = formatDate(d);
  const relative = timeAgo(d.toISOString());

  return (
    <div
      className={clsx(
        "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      <div className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </div>
      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-mono">
        {primary}
      </div>
      <div className="mt-2">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
          {relative}
        </span>
      </div>
    </div>
  );
};
