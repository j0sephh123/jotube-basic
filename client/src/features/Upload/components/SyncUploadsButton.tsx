import { RefreshCw } from "lucide-react";
import {
  formatLastSync,
  getLastSyncColor,
} from "@/shared/components/card/helper";
import clsx from "clsx";
import useSyncUploads from "../hooks/useSyncUploads";

type SyncUploadsButtonProps = {
  lastSyncedAt: string | null;
  ytChannelId: string;
  id: number;
  onSuccess?: () => void;
};

export default function SyncUploadsButton({
  lastSyncedAt,
  ytChannelId,
  id,
  onSuccess,
}: SyncUploadsButtonProps) {
  const syncUploads = useSyncUploads(ytChannelId);

  const handleSync = async () => {
    if (!ytChannelId) return;

    try {
      await syncUploads.mutateAsync({
        ytChannelId,
        channelId: id,
      });
      onSuccess?.();
    } catch (error) {
      console.error("Failed to sync channel:", error);
    }
  };

  return (
    <button
      onClick={handleSync}
      className="text-xs flex items-center gap-1 hover:bg-gray-700/50 p-1 rounded transition-colors w-20 justify-center"
    >
      <RefreshCw
        className={clsx(
          "w-4 h-4",
          getLastSyncColor(lastSyncedAt),
          syncUploads.isPending && "animate-spin"
        )}
      />
      <span className={clsx(getLastSyncColor(lastSyncedAt), "font-medium")}>
        {formatLastSync(lastSyncedAt)}
      </span>
    </button>
  );
}
