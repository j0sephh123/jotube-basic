/* eslint-disable boundaries/element-types */
import { ViewType, useTitleClick } from "@features/Dashboard";
import { SyncUploadsButton, FetchUploadsButton } from "@features/Upload";
import { Button, Card } from "@shared/ui";
import { DeleteChannel } from "@entities/Channel";
import type {
  DashboardChannelResponse,
  FeaturedScreenshotResponse,
} from "@shared/api";
import { ListMusic, ExternalLink, Images } from "lucide-react";
import clsx from "clsx";
import { routes } from "@shared/routes";
import { Link, useNavigate } from "react-router-dom";
import { useViewThumbnails } from "@features/Thumbnails";
import { useGalleryModal } from "@app/providers";
import {
  useFeaturedScreenshots,
  useScreenshotsForCarousel,
} from "@features/Screenshot";

const statsTypes = [
  ViewType.THUMBNAILS,
  ViewType.PROCESSED,
  ViewType.SAVED,
  ViewType.HAS_STORYBOARDS,
];
const fetchUploadsTypes = [ViewType.NO_UPLOADS];
const downloadTypes = [ViewType.THUMBNAILS, ViewType.PROCESSED, ViewType.SAVED];
const deleteChannelTypes = [ViewType.NO_UPLOADS];

type Props = DashboardChannelResponse & {
  viewType: ViewType;
  openPlaylistModal: (ytId: string) => void;
  onChannelDelete?: () => void;
  featuredScreenshots: FeaturedScreenshotResponse[];
};

export default function ChannelDashboardCard({
  id,
  ytId,
  title,
  src,
  lastSyncedAt,
  screenshotsCount,
  thumbnails,
  saved,
  defaults,
  storyboard,
  createdAt,
  videoCount,
  viewType,
  playlist,
  openPlaylistModal,
  onChannelDelete,
  featuredScreenshots,
}: Props) {
  const navigate = useNavigate();
  const handleViewScreenshots = useScreenshotsForCarousel();
  const viewThumbnails = useViewThumbnails(id);

  const { getSrc, handleThumbnailClick } = useFeaturedScreenshots(
    featuredScreenshots,
    src
  );

  const cardStats = (
    <Card.Stats
      ytId={ytId}
      id={id}
      screenshotsCount={screenshotsCount}
      thumbnails={thumbnails}
      saved={saved}
      defaults={defaults}
      storyboard={storyboard}
      onNavigate={navigate}
      onViewScreenshots={() => handleViewScreenshots([ytId])}
      onViewThumbnails={viewThumbnails}
    />
  );

  const cardCreatedAt = <Card.CreatedAt createdAt={createdAt} />;

  const cardMenu = <Card.Menu id={id} ytId={ytId} />;

  const syncButton = (
    <SyncUploadsButton lastSyncedAt={lastSyncedAt} ytChannelId={ytId} id={id} />
  );

  const downloadButton = (
    <Card.DownloadButton id={id} ytChannelId={ytId} onDownload={() => {}} />
  );

  const deleteUploadsButton = (
    <Card.DeleteButton ytChannelId={ytId} onDelete={() => {}} />
  );

  const deleteChannelbutton = (
    <DeleteChannel id={id} onSuccess={onChannelDelete} />
  );

  const fetchUploadsButton = (
    <FetchUploadsButton ytChannelId={ytId} videoCount={videoCount} />
  );

  const playlistButton = (
    <div className="flex items-center gap-2">
      <button
        onClick={() => openPlaylistModal(ytId)}
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

  const playlistInfo = playlist && (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <ListMusic className="w-4 h-4" />
      <span className="truncate">{playlist.name}</span>
    </div>
  );

  const handleTitleClick = useTitleClick(
    {
      ytId,
      title,
      src,
      lastSyncedAt,
    },
    viewType
  );

  const getDeleteButtonSlot = () => {
    if (viewType === ViewType.NO_SCREENSHOTS) {
      return null;
    }
    return deleteChannelTypes.includes(viewType)
      ? deleteChannelbutton
      : deleteUploadsButton;
  };

  const getActionButtonSlot = () => {
    if (viewType === ViewType.NO_SCREENSHOTS) {
      return null;
    }
    return fetchUploadsTypes.includes(viewType)
      ? fetchUploadsButton
      : syncButton;
  };

  const { setGalleryModal } = useGalleryModal();

  const handleGalleryClick = () => {
    setGalleryModal({
      ytVideoId: "",
      ytChannelIds: [ytId],
    });
  };

  return (
    <Card
      key={id}
      id={id}
      ytId={ytId}
      title={title}
      src={getSrc}
      lastSyncedAt={lastSyncedAt}
      ytChannelId={ytId}
      handleTitleClick={handleTitleClick}
      secondRow={
        statsTypes.includes(viewType)
          ? cardStats
          : playlist
          ? playlistInfo
          : cardCreatedAt
      }
      cardMenuSlot={cardMenu}
      actionButtonSlot={getActionButtonSlot()}
      downloadButtonSlot={
        downloadTypes.includes(viewType) ? downloadButton : undefined
      }
      deleteButtonSlot={getDeleteButtonSlot()}
      playlistButtonSlot={playlistButton}
      onThumbnailClick={handleThumbnailClick}
      featuredScreenshotsLength={featuredScreenshots.length}
      galleryButtonSlot={
        <Button onClick={handleGalleryClick}>
          <Images />
        </Button>
      }
    />
  );
}
