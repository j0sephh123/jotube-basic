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
import { type To } from "@shared/types";

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

  const handleStoryboardNavigate = () => {
    navigate(`/playlists/${id}/storyboards` as To);
  };

  const handleStoryboardAction = () => {
    getStoryboards(channels.map((channel) => channel.id));
  };

  const handleScreenshotNavigate = () => {
    navigate(`/playlists/${id}/screenshots` as To);
  };

  const handleScreenshotAction = () => {
    viewScreenshots(channels.map((channel) => channel.id));
  };

  const handleGalleryNavigate = () => {
    navigate(`/playlists/${id}/gallery` as To);
  };

  const handleGalleryAction = () => {
    setGalleryModal({
      ytVideoId: "",
      channelIds: channels.map((channel) => channel.id),
    });
  };

  const handleThumbnailNavigate = () => {
    navigate(`/playlists/${id}/thumbnails` as To);
  };

  const handleThumbnailAction = () => {
    viewThumbnails({
      idType: IdType.Playlist,
      playlistId: id,
    });
  };

  const handleDefaultNavigate = () => {
    navigate(`/playlists/${id}/uploads/default` as To);
  };

  const handleSavedNavigate = () => {
    navigate(`/playlists/${id}/uploads/saved` as To);
  };

  const items = [
    { name: "storyboard", count: totalCounts.storyboardCount },
    { name: "screenshot", count: totalCounts.screenshotCount },
    { name: "gallery", count: totalCounts.screenshotCount },
    { name: "thumbnail", count: totalCounts.thumbnailCount },
    { name: "default", count: totalCounts.videoCount },
    { name: "saved", count: totalCounts.savedCount },
  ];

  const actions = {
    storyboard: {
      onNavigate: handleStoryboardNavigate,
      onFirst: handleStoryboardAction,
    },
    screenshot: {
      onNavigate: handleScreenshotNavigate,
      onFirst: handleScreenshotAction,
    },
    gallery: {
      onNavigate: handleGalleryNavigate,
      onFirst: handleGalleryAction,
    },
    thumbnail: {
      onNavigate: handleThumbnailNavigate,
      onFirst: handleThumbnailAction,
    },
    default: {
      onNavigate: handleDefaultNavigate,
    },
    saved: {
      onNavigate: handleSavedNavigate,
    },
  };

  return (
    <GenericHeaderContainer
      topLeft={
        <PlaylistHeaderTitleSection
          name={name}
          channelsLength={channels.length}
        />
      }
      topRight={<Iterator items={items} actions={actions} />}
    />
  );
}
