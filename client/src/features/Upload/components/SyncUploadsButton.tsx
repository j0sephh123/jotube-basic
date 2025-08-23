import { RefreshCw } from "lucide-react";
import clsx from "clsx";
import { useSyncUploads } from "@features/Upload";

// Local utility functions to avoid shared dependency
const getLastSyncColor = (lastSync: string | null) => {
  if (!lastSync) return "text-gray-400";
  const hoursSinceSync =
    (Date.now() - new Date(lastSync).getTime()) / (1000 * 60 * 60);
  if (hoursSinceSync < 1) return "text-green-400";
  if (hoursSinceSync < 24) return "text-yellow-400";
  return "text-red-400";
};

const formatLastSync = (lastSync: string | null) => {
  if (!lastSync) return "Never";
  const hoursSinceSync =
    (Date.now() - new Date(lastSync).getTime()) / (1000 * 60 * 60);
  if (hoursSinceSync < 1) return "Now";
  if (hoursSinceSync < 24) return `${Math.floor(hoursSinceSync)}h`;
  return `${Math.floor(hoursSinceSync / 24)}d`;
};

type SyncUploadsButtonProps = {
  lastSyncedAt?: string | null;
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
  const lastSync = lastSyncedAt || null;

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
          getLastSyncColor(lastSync),
          syncUploads.isPending && "animate-spin"
        )}
      />
      <span className={clsx(getLastSyncColor(lastSync), "font-medium")}>
        {formatLastSync(lastSync)}
      </span>
    </button>
  );
}
