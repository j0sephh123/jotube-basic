import { IdType, type PlaylistDetailsResponse } from "@shared/api";
import { useScreenshotsForCarousel } from "@features/Screenshot";
import { setGalleryModal } from "@features/Gallery";
import { Iterator } from "@shared/ui";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { useViewThumbnails } from "@features/Thumbnails";
// eslint-disable-next-line boundaries/element-types
import { GenericHeaderContainer } from "@widgets/GenericHeaderContainer";
import { PlaylistHeaderTitleSection } from "./PlaylistHeaderTitleSection";
import { useCustomNavigate } from "@shared/hooks";
import { useMemo, useCallback } from "react";

type HeaderProps = {
  playlist: PlaylistDetailsResponse;
};

export function PlaylistHeader({
  playlist: { id, name, channels },
}: HeaderProps) {
  const viewScreenshots = useScreenshotsForCarousel();
  const getStoryboards = useGetUploadsWithStoryboards().mutateAsync;
  const viewThumbnails = useViewThumbnails();
  const navigate = useCustomNavigate();

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

  const handleStoryboardNavigate = useCallback(() => {
    navigate(`/playlists/${id}/storyboards`);
  }, [navigate, id]);

  const handleStoryboardAction = useCallback(() => {
    getStoryboards(channels.map((channel) => channel.id));
  }, [getStoryboards, channels]);

  const handleScreenshotNavigate = useCallback(() => {
    navigate(`/playlists/${id}/screenshots`);
  }, [navigate, id]);

  const handleScreenshotAction = useCallback(() => {
    viewScreenshots(channels.map((channel) => channel.id));
  }, [viewScreenshots, channels]);

  const handleGalleryNavigate = useCallback(() => {
    navigate(`/playlists/${id}/gallery`);
  }, [navigate, id]);

  const handleGalleryAction = useCallback(() => {
    setGalleryModal({
      ytVideoId: "",
      channelIds: channels.map((channel) => channel.id),
    });
  }, [channels]);

  const handleThumbnailNavigate = useCallback(() => {
    navigate(`/playlists/${id}/thumbnails`);
  }, [navigate, id]);

  const handleThumbnailAction = useCallback(() => {
    viewThumbnails({
      idType: IdType.Playlist,
      playlistId: id,
    });
  }, [viewThumbnails, id]);

  const handleDefaultNavigate = useCallback(() => {
    navigate(`/playlists/${id}/uploads/default`);
  }, [navigate, id]);

  const handleSavedNavigate = useCallback(() => {
    navigate(`/playlists/${id}/uploads/saved`);
  }, [navigate, id]);

  const items = useMemo(
    () => [
      { name: "storyboards", count: totalCounts.storyboardCount },
      { name: "screenshots", count: totalCounts.screenshotCount },
      { name: "gallery", count: totalCounts.screenshotCount },
      { name: "thumbnails", count: totalCounts.thumbnailCount },
      { name: "default", count: totalCounts.videoCount },
      { name: "saved", count: totalCounts.savedCount },
    ],
    [totalCounts]
  );

  const actions = useMemo(
    () => ({
      storyboards: {
        onNavigate: handleStoryboardNavigate,
        onFirst: handleStoryboardAction,
      },
      screenshots: {
        onNavigate: handleScreenshotNavigate,
        onFirst: handleScreenshotAction,
      },
      gallery: {
        onNavigate: handleGalleryNavigate,
        onFirst: handleGalleryAction,
      },
      thumbnails: {
        onNavigate: handleThumbnailNavigate,
        onFirst: handleThumbnailAction,
      },
      default: {
        onNavigate: handleDefaultNavigate,
      },
      saved: {
        onNavigate: handleSavedNavigate,
      },
    }),
    [
      handleStoryboardNavigate,
      handleStoryboardAction,
      handleScreenshotNavigate,
      handleScreenshotAction,
      handleGalleryNavigate,
      handleGalleryAction,
      handleThumbnailNavigate,
      handleThumbnailAction,
      handleDefaultNavigate,
      handleSavedNavigate,
    ]
  );

  return (
    <GenericHeaderContainer
      topLeft={
        <PlaylistHeaderTitleSection
          name={name}
          channelsLength={channels.length}
          playlistId={id}
        />
      }
      topRight={<Iterator items={items} actions={actions} />}
    />
  );
}
