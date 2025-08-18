import { useChannelMetadataQuery } from "@/entities/Channel/model/useChannelMetadata";
import { useLocation } from "react-router-dom";
import { useTypedChannelYtId } from "@widgets/Dashboard/lib/useDashboardParams";
import { usePlaylist } from "@store/store";
import { ListMusic, ExternalLink } from "lucide-react";
import clsx from "clsx";
import { routes } from "@/shared/routes";
import { Link } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import ChannelControls from "./ChannelControls";
import SyncUploadsButton from "@features/Upload/components/SyncUploadsButton";
import CleanShortUploads from "@features/Upload/components/CleanShortUploads";
import ChannelLink from "@shared/ui/ChannelLink";
import CopyValue from "@shared/ui/CopyValue";
import OpenExplorerButton from "@shared/ui/OpenDirectoryButton/OpenDirectoryButton";
import Tabs from "./Tabs";
import BulkOperations from "./BulkOperations";
import ViewThumbnails from "@entities/Channel/ui/ViewThumbnails";
import ViewScreenshots from "@entities/Channel/ui/ViewScreenshots";
import FetchUploadsButton from "@features/Upload/components/FetchUploadsButton";
import ViewStoryboards from "@shared/ui/ViewStoryboards/ViewStoryboards";

const ChannelHeader = () => {
  const ytChannelId = useTypedChannelYtId();
  const { pathname } = useLocation();
  const { openPlaylistModal } = usePlaylist();
  const isSavedPage = pathname.includes("/saved");
  const isIndexPage = pathname.length === 34;

  const { data: metadata, refetch: refetchMetadata } =
    useChannelMetadataQuery(ytChannelId);

  if (!metadata) return null;

  const {
    title,
    screenshotArtifactsCount,
    id,
    thumbnailArtifactsCount,
    playlist,
    videoCount,
    fetchedUntilEnd,
    storyboardArtifactsCount,
  } = metadata;

  const playlistButton = (
    <div className="flex items-center gap-2">
      <button
        onClick={() => openPlaylistModal(ytChannelId)}
        className={clsx(
          "btn btn-sm",
          playlist ? "btn-primary" : "btn-ghost btn-secondary"
        )}
        title={playlist ? `Current: ${playlist.name}` : "Add to Playlist"}
      >
        <ListMusic className="w-4 h-4" />
        {playlist && <span className="ml-1">{playlist.name}</span>}
      </button>
      {playlist && (
        <Link
          to={routes.playlist(playlist.id)}
          className="btn btn-sm btn-ghost"
          title={`Go to ${playlist.name} playlist`}
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      )}
    </div>
  );

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
              <ViewStoryboards
                ytChannelId={ytChannelId}
                storyboardArtifactsCount={storyboardArtifactsCount}
              />
              <ViewThumbnails
                id={id}
                thumbnailArtifactsCount={thumbnailArtifactsCount}
              />
              <ViewScreenshots
                ytChannelId={ytChannelId}
                screenshotArtifactsCount={screenshotArtifactsCount}
              />
              {playlistButton}
              {!fetchedUntilEnd && (
                <FetchUploadsButton
                  ytChannelId={ytChannelId}
                  videoCount={videoCount}
                  onSuccess={refetchMetadata}
                />
              )}
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
