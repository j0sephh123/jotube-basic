import { IdType, type PlaylistDetailsResponse } from "@shared/api";
import { useScreenshotsForCarousel } from "@features/Screenshot";
import { setGalleryModal } from "@features/Gallery";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { useViewThumbnails } from "@features/Thumbnails";
import { useCallback } from "react";
import { Camera, RefreshCw } from "lucide-react";
import { StoryboardButton } from "@features/Channel";
// eslint-disable-next-line boundaries/element-types
import StatWithActions from "@widgets/StatWithActions";

type HeaderProps = {
  playlist: PlaylistDetailsResponse;
  onRefresh?: () => void;
};

export function PlaylistHeader({
  playlist: { id, channels },
  onRefresh,
}: HeaderProps) {
  const viewScreenshots = useScreenshotsForCarousel();
  const getStoryboards = useGetUploadsWithStoryboards().mutateAsync;
  const viewThumbnails = useViewThumbnails();

  const totalCounts = channels.reduce(
    (acc, channel) => ({
      videoCount: acc.videoCount + channel.videoCount,
      savedCount: acc.savedCount + channel.saved,
      screenshotCount: acc.screenshotCount + channel.screenshotCount,
      thumbnailCount: acc.thumbnailCount + channel.thumbnailCount,
      storyboardCount: acc.storyboardCount + channel.storyboardCount,
    }),
    {
      videoCount: 0,
      savedCount: 0,
      screenshotCount: 0,
      thumbnailCount: 0,
      storyboardCount: 0,
    }
  );

  const handleStoryboardAction = useCallback(() => {
    getStoryboards(channels.map((channel) => channel.id));
  }, [getStoryboards, channels]);

  const handleScreenshotAction = useCallback(() => {
    viewScreenshots(channels.map((channel) => channel.id));
  }, [viewScreenshots, channels]);

  const handleGalleryAction = useCallback(() => {
    setGalleryModal({
      collectionItemId: "",
      collectionIds: channels.map((channel) => channel.id),
    });
  }, [channels]);

  const handleThumbnailAction = useCallback(() => {
    viewThumbnails({
      idType: IdType.Playlist,
      playlistId: id,
    });
  }, [viewThumbnails, id]);

  return (
    <div className="flex gap-2">
      {onRefresh && (
        <StatWithActions
          label="Refresh"
          value={0}
          leftAction={{
            icon: <RefreshCw className="w-4 h-4" />,
            tooltip: "Refresh Playlist Data",
            onClick: onRefresh,
          }}
        />
      )}
      <StatWithActions
        label="storyboards"
        value={totalCounts.storyboardCount}
        leftAction={{
          tooltip: "View storyboards",
          onClick: handleStoryboardAction,
        }}
        rightAction={{
          icon: <StoryboardButton playlistId={id} />,
          tooltip: "Generate Storyboards",
          onClick: () => {},
        }}
      />
      <StatWithActions
        label="Screenshots"
        value={totalCounts.screenshotCount}
        layout="horizontal"
        leftAction={{
          tooltip: "View Screenshots",
          onClick: handleScreenshotAction,
        }}
        rightAction={{
          icon: <Camera className="w-4 h-4" />,
          tooltip: "View Gallery",
          onClick: handleGalleryAction,
        }}
      />
      <StatWithActions
        label="thumbnails"
        value={totalCounts.thumbnailCount}
        leftAction={{
          tooltip: "View thumbnails",
          onClick: handleThumbnailAction,
        }}
      />
    </div>
  );
}
