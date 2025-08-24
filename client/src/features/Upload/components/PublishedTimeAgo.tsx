import { timeAgo } from "@shared/utils";

export function PublishedTimeAgo({ date }: { date: string }) {
  return (
    <span className="text-xs text-base-content/70 truncate min-w-0">
      {timeAgo(date)}
    </span>
  );
}
