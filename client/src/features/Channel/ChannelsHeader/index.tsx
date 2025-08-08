import { useChannelMetadataQuery } from "@/features/Channel/hooks/useChannelMetadata";
import { useLocation } from "react-router-dom";
import { useTypedChannelYtId } from "@/shared/hooks/useTypedParams";
import HeaderLayout from "./HeaderLayout";
import ChannelControls from "./ChannelControls";
import SyncUploadsButton from "@/features/Upload/components/SyncUploadsButton";
import CleanShortUploads from "@/features/Upload/components/CleanShortUploads";
import ChannelLink from "@/shared/components/ChannelLink";
import CopyValue from "@/shared/components/CopyValue";
import OpenExplorerButton from "@/shared/components/OpenDirectoryButton/OpenDirectoryButton";
import Tabs from "./Tabs";
import BulkOperations from "./BulkOperations";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";

const ChannelHeader = () => {
  const ytChannelId = useTypedChannelYtId();
  const { pathname } = useLocation();
  const isSavedPage = pathname.includes("/saved");
  const isIndexPage = pathname.length === 34;

  const { data: metadata } = useChannelMetadataQuery(ytChannelId);
  const { viewThumbnails, getScreenshots } = useArtifacts();

  if (!metadata) return null;

  const { title, screenshotArtifactsCount, id, thumbnailArtifactsCount } =
    metadata;

  const handleViewThumbnails = () => {
    viewThumbnails([id]);
  };

  const handleViewScreenshots = () => {
    getScreenshots([ytChannelId]);
  };

  return (
    <div className="bg-base-200 rounded-lg px-6 pt-16 shadow-md">
      <div className="flex flex-col gap-6">
        <HeaderLayout
          left={
            <>
              <ChannelLink ytId={ytChannelId} where="saved">
                <h2 className="text-xl font-bold pr-4">{title}</h2>
              </ChannelLink>
              <CopyValue type="youtube" value={ytChannelId} />
              <OpenExplorerButton ytChannelId={ytChannelId} />
            </>
          }
          center={<Tabs ytChannelId={ytChannelId} />}
          right={
            <div className="flex items-center gap-2">
              <button
                onClick={handleViewThumbnails}
                className="btn btn-sm btn-outline"
              >
                <span className="flex items-center gap-1">
                  Thumbnails ({thumbnailArtifactsCount})
                </span>
              </button>
              <button
                onClick={handleViewScreenshots}
                className="btn btn-sm btn-outline"
              >
                <span className="flex items-center gap-1">
                  Screenshots ({screenshotArtifactsCount})
                </span>
              </button>
              <BulkOperations
                ytChannelId={ytChannelId}
                isSavedPage={isSavedPage}
                isIndexPage={isIndexPage}
              />
            </div>
          }
        />

        {!pathname.includes("/gallery") &&
          !pathname.includes("/saved") &&
          !pathname.includes("/storyboard") && (
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

export default ChannelHeader;
