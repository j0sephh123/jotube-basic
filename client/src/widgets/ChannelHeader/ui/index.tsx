import { useChannelMetadataQuery } from "@entities/Channel";
import { useLocation } from "react-router-dom";
import { useTypedChannelYtId } from "@features/Dashboard";
import { ListMusic, ExternalLink } from "lucide-react";
import clsx from "clsx";
import { routes } from "@shared/routes";
import { Link } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import ChannelControls from "./ChannelControls";
import {
  SyncUploadsButton,
  CleanShortUploads,
  FetchUploadsButton,
} from "@features/Upload";
import { CardMenu, ChannelLink } from "@shared/ui";
import Tabs from "./Tabs";
import ViewThumbnails from "./ViewThumbnails";
import { ViewScreenshots } from "@features/Thumbnails";
import { ViewStoryboards } from "@widgets/Storyboard";

type Props = {
  openPlaylistModal: (ytId: string) => void;
  onResetRangeFilters: () => void;
};

const ChannelHeader = ({ openPlaylistModal, onResetRangeFilters }: Props) => {
  const ytChannelId = useTypedChannelYtId();
  const { pathname } = useLocation();

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
      <div className="flex flex-col">
        <HeaderLayout
          left={
            <>
              <ChannelLink ytId={ytChannelId} where="saved">
                <h2 className="text-xl font-bold pr-4">{title}</h2>
              </ChannelLink>
              {playlistButton}
              <CardMenu id={id} ytId={ytChannelId} />
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
              {!fetchedUntilEnd && (
                <FetchUploadsButton
                  ytChannelId={ytChannelId}
                  videoCount={videoCount}
                  onSuccess={refetchMetadata}
                />
              )}
            </div>
          }
        />

        {!pathname.includes("/gallery") &&
          !pathname.includes("/saved") &&
          !pathname.includes("/storyboard") &&
          !pathname.includes("/new-gallery") && (
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
              onResetRangeFilters={onResetRangeFilters}
            />
          )}
      </div>
    </div>
  );
};

export default ChannelHeader;
