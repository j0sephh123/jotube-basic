import { type QueueItem } from "@shared/hooks";
import clsx from "clsx";

export function VideoItem({
  item,
  isActive,
  handleRemoveJob,
}: {
  item: QueueItem;
  isActive: boolean;
  handleRemoveJob: (id: string) => void;
}) {
  return (
    <li
      key={item.id}
      className={clsx(
        "border-t border-zinc-700/50 px-3 py-1.5 flex justify-between items-center",
        {
          "bg-zinc-800/70": isActive,
        }
      )}
    >
      <div className="flex flex-col">
        <span
          className="text-sm text-white truncate max-w-[220px]"
          title={`${item.videoTitle || ""} (${item.ytVideoId})`}
        >
          {item.videoTitle}
        </span>
      </div>
      {item.phases && (
        <div className="text-xs text-zinc-300">
          {item.phases[item.phases.length - 1]?.phase}
        </div>
      )}
      <div className="flex items-center gap-2">
        <span
          className={clsx("text-xs px-1.5 py-0.5 rounded", {
            "bg-green-900/30 text-green-400": isActive,
            "bg-zinc-700/50 text-zinc-300": !isActive,
          })}
        >
          {item.state}
        </span>
        {!isActive && (
          <button
            onClick={() => handleRemoveJob(item.id)}
            className="btn btn-error btn-xs px-1 h-5 min-h-0"
          >
            Cancel
          </button>
        )}
      </div>
    </li>
  );
}
