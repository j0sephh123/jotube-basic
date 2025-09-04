import { ViewType } from "@features/Dashboard";
import { SyncUploadsButton, FetchUploadsButton } from "@features/Upload";
import { Button, Card } from "@shared/ui";
import type {
  DashboardChannelResponse,
  FeaturedScreenshotResponse,
} from "@shared/api";
import { Images } from "lucide-react";
import { useViewThumbnails } from "@features/Thumbnails";
import { setGalleryModal } from "@features/Gallery";
import {
  useFeaturedScreenshots,
  useScreenshotsForCarousel,
} from "@features/Screenshot";
import { PlaylistControl } from "@features/Playlist";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { useCustomNavigate } from "@shared/hooks";
import { makeYtChannelId } from "@shared/types";
// eslint-disable-next-line import/no-internal-modules
import { DeleteChannel } from "@entities/Channel/ui";

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
  const navigate = useCustomNavigate();
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
      onViewScreenshots={() => handleViewScreenshots([id])}
      onViewThumbnails={viewThumbnails}
      onViewStoryboards={() => viewStoryboards.mutateAsync(id)}
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
    <FetchUploadsButton channelId={id} videoCount={videoCount} />
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
      to={`/channels/${makeYtChannelId(ytId)}`}
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
      playlistButtonSlot={
        playlist ? (
          <PlaylistControl
            isPlaylistPage={!!isPlaylistPage}
            id={id}
            playlistId={playlist.id}
            playlistName={playlist.name}
          />
        ) : null
      }
    />
  );
}
