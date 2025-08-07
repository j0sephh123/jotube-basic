import { useChannelMetadataQuery } from "@/features/Channel/hooks/useChannelMetadata";
import { useLocation } from "react-router-dom";
import { useTypedChannelYtId } from "@/shared/hooks/useTypedParams";
import ChannelMetadata from "./ChannelMetadata";
import ChannelActions from "./ChannelActions";
import ChannelControls from "./ChannelControls";
import SyncUploadsButton from "@/features/Upload/components/SyncUploadsButton";
import CleanShortUploads from "@/features/Upload/components/CleanShortUploads";

const ChannelsHeader = () => {
  const ytChannelId = useTypedChannelYtId();
  const { pathname } = useLocation();
  const isSavedPage = pathname.includes("/saved");
  const isIndexPage = pathname.length === 34;

  const { data: metadata } = useChannelMetadataQuery(ytChannelId);

  if (!metadata) return null;

  return (
    <div className="bg-base-200 rounded-lg px-6 pt-16 shadow-md">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <ChannelMetadata
            ytChannelId={ytChannelId}
            metadata={metadata}
            isSavedPage={isSavedPage}
            isIndexPage={isIndexPage}
          />
          <ChannelActions
            ytChannelId={ytChannelId}
            id={metadata.id}
            thumbnailArtifactsCount={metadata.thumbnailArtifactsCount}
            screenshotArtifactsCount={metadata.screenshotArtifactsCount}
          />
        </div>

        {!pathname.includes("/gallery") && !pathname.includes("/saved") && (
          <ChannelControls
            leftSlot={
              <>
                <SyncUploadsButton
                  lastSyncedAt={metadata?.lastSyncedAt ?? null}
                  ytChannelId={ytChannelId}
                  id={metadata?.id ?? 0}
                />
                <CleanShortUploads ytChannelId={ytChannelId} />
              </>
            }
          />
        )}
      </div>
    </div>
  );
};

export default ChannelsHeader;
