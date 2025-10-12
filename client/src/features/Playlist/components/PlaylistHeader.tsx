import { IdType, type PlaylistDetailsResponse } from "@shared/api";
import { useScreenshotsForCarousel } from "@features/Screenshot";
import { setGalleryModal } from "@features/Gallery";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { useViewThumbnails } from "@features/Thumbnails";
import { useCallback } from "react";
import { Camera, RefreshCw, FileVideo, Bookmark } from "lucide-react";
import { StoryboardButton } from "@features/Channel";
import { PlaylistBulkDownloadButton } from "@features/Playlist";
import { useCustomNavigate } from "@shared/hooks";
// eslint-disable-next-line boundaries/element-types
import StatWithActions from "@widgets/StatWithActions";
import { To } from "@shared/types";

type HeaderProps = {
  playlist: PlaylistDetailsResponse;
  onRefresh?: () => void;
};

export function PlaylistHeader({
  playlist: { id, channels },
  onRefresh,
}: HeaderProps) {
  const navigate = useCustomNavigate();
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

  const handleDefaultVideosAction = useCallback(() => {
    navigate(`/dashboard/playlists/default/${id}` as To);
  }, [navigate, id]);

  const handleSavedVideosAction = useCallback(() => {
    navigate(`/dashboard/playlists/saved/${id}` as To);
  }, [navigate, id]);

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
        label="Default"
        value={totalCounts.videoCount}
        layout="horizontal"
        leftAction={{
          icon: <FileVideo className="w-4 h-4" />,
          tooltip: "View Default Videos",
          onClick: handleDefaultVideosAction,
        }}
        rightAction={{
          icon: <StoryboardButton playlistId={id} />,
          tooltip: "Generate Storyboards",
          onClick: () => {},
        }}
      />
      <StatWithActions
        label="Saved"
        value={totalCounts.savedCount}
        layout="horizontal"
        leftAction={{
          icon: <Bookmark className="w-4 h-4" />,
          tooltip: "View Saved Videos",
          onClick: handleSavedVideosAction,
        }}
        rightAction={{
          icon: <PlaylistBulkDownloadButton playlistId={id} />,
          tooltip: "Bulk Download Videos",
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
