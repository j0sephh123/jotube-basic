import { IdType, type PlaylistDetailsResponse } from "@shared/api";
import { useScreenshotsForCarousel } from "@features/Screenshot";
import { setGalleryModal } from "@features/Gallery";
import { Iterator } from "@shared/ui";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { useViewThumbnails } from "@features/Thumbnails";
import { useMemo, useCallback } from "react";

type HeaderProps = {
  playlist: PlaylistDetailsResponse;
};

export function PlaylistHeader({ playlist: { id, channels } }: HeaderProps) {
  const viewScreenshots = useScreenshotsForCarousel();
  const getStoryboards = useGetUploadsWithStoryboards().mutateAsync;
  const viewThumbnails = useViewThumbnails();

  const totalCounts = channels.reduce(
    (acc, channel) => ({
      videoCount: acc.videoCount + channel.videoCount,
      savedCount: acc.savedCount + channel.savedCount,
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
      ytVideoId: "",
      channelIds: channels.map((channel) => channel.id),
    });
  }, [channels]);

  const handleThumbnailAction = useCallback(() => {
    viewThumbnails({
      idType: IdType.Playlist,
      playlistId: id,
    });
  }, [viewThumbnails, id]);

  const items = useMemo(
    () => [
      { name: "storyboards", count: totalCounts.storyboardCount },
      { name: "screenshots", count: totalCounts.screenshotCount },
      { name: "gallery", count: totalCounts.screenshotCount },
      { name: "thumbnails", count: totalCounts.thumbnailCount },
    ],
    [totalCounts]
  );

  const actions = useMemo(
    () => ({
      storyboards: {
        onFirst: handleStoryboardAction,
      },
      screenshots: {
        onFirst: handleScreenshotAction,
      },
      gallery: {
        onFirst: handleGalleryAction,
      },
      thumbnails: {
        onFirst: handleThumbnailAction,
      },
    }),
    [
      handleStoryboardAction,
      handleScreenshotAction,
      handleGalleryAction,
      handleThumbnailAction,
    ]
  );

  return <Iterator items={items} actions={actions} cols={2} />;
}
