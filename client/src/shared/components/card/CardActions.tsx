import SyncUploadsButton from "../../../features/Upload/components/SyncUploadsButton";
import CardDeleteButton from "./CardDeleteButton";
import CardDownloadButton from "./CardDownloadButton";

type CardActionsProps = {
  id: number;
  ytChannelId?: string;
  lastSyncedAt?: string | null;
  showSyncButton?: boolean;
  showActionButtons?: boolean;
};

function CardActions({
  id,
  ytChannelId,
  lastSyncedAt,
  showSyncButton = true,
  showActionButtons = true,
}: CardActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {showSyncButton && ytChannelId && (
        <SyncUploadsButton
          lastSyncedAt={lastSyncedAt || null}
          ytChannelId={ytChannelId}
          id={id}
        />
      )}
      {showActionButtons && <CardDownloadButton id={id} />}
      {showActionButtons && ytChannelId && (
        <CardDeleteButton
          ytChannelId={ytChannelId}
        />
      )}
    </div>
  );
}

export default CardActions;
