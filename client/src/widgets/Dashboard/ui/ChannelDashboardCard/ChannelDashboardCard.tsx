/* eslint-disable boundaries/element-types */
import { ViewType, useTitleClick } from "@features/Dashboard";
import { SyncUploadsButton, FetchUploadsButton } from "@features/Upload";
import { Button, Card } from "@shared/ui";
import { DeleteChannel } from "@entities/Channel";
import type {
  DashboardChannelResponse,
  FeaturedScreenshotResponse,
} from "@shared/api";
import { ListMusic, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useViewThumbnails } from "@features/Thumbnails";
import { setGalleryModal } from "@features/Gallery";
import {
  useFeaturedScreenshots,
  useScreenshotsForCarousel,
} from "@features/Screenshot";
import { setPlaylistModal } from "@features/Playlist";
import { useRemoveFromPlaylist } from "@features/Playlist";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";

const statsTypes = [
  ViewType.THUMBNAILS,
  ViewType.PROCESSED,
  ViewType.SAVED,
  ViewType.HAS_STORYBOARDS,
];
const fetchUploadsTypes = [ViewType.NO_UPLOADS];
const deleteChannelTypes = [ViewType.NO_UPLOADS];

type Props = DashboardChannelResponse & {
  viewType: ViewType;
  onChannelDelete?: () => void;
  featuredScreenshots: FeaturedScreenshotResponse[];
  isPlaylistPage?: boolean;
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
  onChannelDelete,
  featuredScreenshots,
  isPlaylistPage,
}: Props) {
  const navigate = useNavigate();
  const handleViewScreenshots = useScreenshotsForCarousel();
  const viewThumbnails = useViewThumbnails(id);

  const { getSrc, handleThumbnailClick } = useFeaturedScreenshots(
    featuredScreenshots,
    src
  );

  const viewStoryboards = useGetUploadsWithStoryboards();

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
      onViewStoryboards={() => viewStoryboards.mutateAsync(ytId)}
    />
  );

  const cardCreatedAt = <Card.CreatedAt createdAt={createdAt} />;

  const cardMenu = <Card.Menu id={id} ytId={ytId} />;

  const syncButton = (
    <SyncUploadsButton lastSyncedAt={lastSyncedAt} ytChannelId={ytId} id={id} />
  );

  const deleteChannelbutton = (
    <DeleteChannel id={id} onSuccess={onChannelDelete} />
  );

  const fetchUploadsButton = (
    <FetchUploadsButton ytChannelId={ytId} videoCount={videoCount} />
  );

  const removeFromPlaylist = useRemoveFromPlaylist();

  const playlistInfo = isPlaylistPage ? (
    <Button
      onClick={() => removeFromPlaylist.handleRemoveFromPlaylist(id)}
      size="sm"
    >
      Remove
    </Button>
  ) : (
    <div
      className="flex items-center gap-2 text-sm cursor-pointer"
      onClick={() =>
        setPlaylistModal({
          type: "modifyPlaylistForChannel",
          channelId: id,
          playlistId: playlist?.id ?? 0,
        })
      }
    >
      <ListMusic className="w-4 h-4" />
      {playlist ? (
        <span className="truncate">{playlist.name}</span>
      ) : (
        <span className="truncate">No playlist</span>
      )}
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
    return deleteChannelTypes.includes(viewType) ? deleteChannelbutton : null;
  };

  const getActionButtonSlot = () => {
    if (viewType === ViewType.NO_SCREENSHOTS) {
      return null;
    }
    return fetchUploadsTypes.includes(viewType)
      ? fetchUploadsButton
      : syncButton;
  };

  const handleGalleryClick = () => {
    setGalleryModal({
      ytVideoId: "",
      ytChannelIds: [ytId],
    });
  };

  const getSecondRowContent = () => {
    if (statsTypes.includes(viewType)) {
      return cardStats;
    }

    return cardCreatedAt;
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
      secondRow={getSecondRowContent()}
      cardMenuSlot={cardMenu}
      actionButtonSlot={getActionButtonSlot()}
      deleteButtonSlot={getDeleteButtonSlot()}
      onThumbnailClick={handleThumbnailClick}
      featuredScreenshotsLength={featuredScreenshots.length}
      galleryButtonSlot={
        <Button onClick={handleGalleryClick}>
          <Images />
        </Button>
      }
      playlistButtonSlot={playlistInfo}
    />
  );
}
