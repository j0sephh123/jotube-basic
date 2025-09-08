/* eslint-disable import/no-internal-modules */
import { setGalleryModal } from "@features/Gallery/model/galleryModalStore";
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { Iterator } from "@shared/ui";
import { useViewThumbnails } from "@features/Thumbnails";
import { IdType } from "@shared/api";
import { useScreenshotsForCarousel } from "@features/Screenshot";
import { makeYtChannelId, type To } from "@shared/types";
import { useCustomNavigate } from "@shared/hooks";

interface CombinedActionsProps {
  channelId: number;
  ytChannelId: string;
}

export const ChannelHeaderCombinedActions = ({
  channelId,
  ytChannelId,
}: CombinedActionsProps) => {
  const { data: channelMetadata } = useChannelMetadataQuery(channelId);
  const { mutateAsync: getStoryboards } = useGetUploadsWithStoryboards();
  const viewThumbnails = useViewThumbnails();
  const viewScreenshots = useScreenshotsForCarousel();
  const navigate = useCustomNavigate();

  if (!channelMetadata) return null;

  const {
    screenshotArtifactsCount,
    thumbnailArtifactsCount,
    storyboardArtifactsCount,
    videoArtifactsCount,
    savedArtifactsCount,
  } = channelMetadata;

  const handleStoryboardNavigate = () => {
    navigate(`/channels/${makeYtChannelId(ytChannelId)}/storyboards` as To);
  };

  const handleStoryboardAction = () => {
    getStoryboards([channelId]);
  };

  const handleScreenshotNavigate = () => {
    navigate(`/channels/${makeYtChannelId(ytChannelId)}/screenshots` as To);
  };

  const handleScreenshotAction = () => {
    viewScreenshots([channelId]);
  };

  const handleGalleryNavigate = () => {
    navigate(`/channels/${makeYtChannelId(ytChannelId)}/gallery` as To);
  };

  const handleGalleryAction = () => {
    setGalleryModal({
      ytVideoId: "",
      channelIds: [channelId],
    });
  };

  const handleThumbnailNavigate = () => {
    navigate(`/channels/${makeYtChannelId(ytChannelId)}/thumbnails` as To);
  };

  const handleThumbnailAction = () => {
    viewThumbnails({
      channelIds: [channelId],
      idType: IdType.Channel,
    });
  };

  const handleDefaultNavigate = () => {
    navigate(`/channels/${makeYtChannelId(ytChannelId)}` as To);
  };

  const handleSavedNavigate = () => {
    navigate(`/channels/${makeYtChannelId(ytChannelId)}/saved` as To);
  };

  const items = [
    { name: "storyboard", count: storyboardArtifactsCount },
    { name: "screenshot", count: screenshotArtifactsCount },
    { name: "gallery", count: screenshotArtifactsCount },
    { name: "thumbnail", count: thumbnailArtifactsCount },
    { name: "default", count: videoArtifactsCount },
    { name: "saved", count: savedArtifactsCount },
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

  return <Iterator items={items} actions={actions} />;
};
