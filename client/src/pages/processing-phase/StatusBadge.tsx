import type { PhaseStatus } from "./types";
import { formatDuration } from "@shared/utils";

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
    return <div className="badge badge-outline w-[180px]">Not started</div>;
  }
  if (status === "IN_PROGRESS") {
    return (
      <div className="badge badge-info gap-2 w-[180px] opacity-80">
        <span className="loading loading-spinner loading-xs"></span>
        Running {startedAt ? `• ${formatDuration(startedAt, null)}` : null}
      </div>
    );
  }
  return (
    <div className="badge badge-success gap-1 w-[180px] opacity-80">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Done
      {startedAt && endedAt ? ` • ${formatDuration(startedAt, endedAt)}` : ""}
    </div>
  );
}
