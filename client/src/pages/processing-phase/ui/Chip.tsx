import React from "react";
import { PhaseStatus } from ".";
import { formatDuration } from "./utils";

export function Chip({
  status,
  startedAt,
  endedAt,
}: {
  status: PhaseStatus;
  startedAt?: string;
  endedAt?: string | null;
}) {
  if (status === "NOT_STARTED") {
    return <span className="badge badge-ghost">Not started</span>;
  }
  if (status === "IN_PROGRESS") {
    return (
      <span className="inline-flex items-center gap-2 badge badge-warning text-warning-content">
        <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
        Running {startedAt ? `• ${formatDuration(startedAt, null)}` : null}
      </span>
    );
  }
  return (
    <span className="badge badge-success text-success-content">
      Done
      {startedAt && endedAt ? ` • ${formatDuration(startedAt, endedAt)}` : ""}
    </span>
  );
}
