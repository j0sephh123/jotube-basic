import { RefreshCw } from "lucide-react";
import clsx from "clsx";
import { useSyncUploads } from "@features/Upload";
import { Button } from "@shared/ui";
import { getLastSyncColor, formatLastSync } from "./utils";

type Props = {
  lastSyncedAt?: string | null;
  id: number;
  onSuccess?: () => void;
};

export default function SyncUploadsButton({
  lastSyncedAt,
  id,
  onSuccess,
}: Props) {
  const syncUploads = useSyncUploads();
  const lastSync = lastSyncedAt || null;

  const handleSync = async () => {
    try {
      await syncUploads.mutateAsync({
        channelId: id,
      });
      onSuccess?.();
    } catch (error) {
      console.error("Failed to sync channel:", error);
    }
  };

  return (
    <Button
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
    </Button>
  );
}
