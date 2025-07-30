import { RefreshCw } from "lucide-react";
import { formatLastSync, getLastSyncColor } from "./helper";

type SyncButtonProps = {
  lastSyncedAt: string | null;
  syncUploadsIsPending: boolean;
  onClick: () => void;
};

export default function SyncButton({
  lastSyncedAt,
  syncUploadsIsPending,
  onClick,
}: SyncButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-xs flex items-center gap-1 hover:bg-gray-700/50 px-2 py-1 rounded transition-colors w-20 justify-center ${"hover:scale-105"}`}
    >
      <RefreshCw
        className={`w-3 h-3 ${getLastSyncColor(lastSyncedAt)} ${
          syncUploadsIsPending ? "animate-spin" : ""
        }`}
      />
      <span className={`${getLastSyncColor(lastSyncedAt)} font-medium`}>
        {formatLastSync(lastSyncedAt)}
      </span>
    </button>
  );
}
