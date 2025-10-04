/* eslint-disable import/no-internal-modules */
import { setGalleryModal } from "@features/Gallery/model/galleryModalStore";
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { Iterator } from "@shared/ui";
import { useViewThumbnails } from "@features/Thumbnails";
import { IdType } from "@shared/api";
import { useScreenshotsForCarousel } from "@features/Screenshot";
import { makeYtChannelId } from "@shared/types";
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
    navigate(`/channels/${makeYtChannelId(ytChannelId)}/storyboards`);
  };

  const handleStoryboardAction = () => {
    getStoryboards([channelId]);
  };

  const handleScreenshotNavigate = () => {
    navigate(`/channels/${makeYtChannelId(ytChannelId)}/screenshots`);
  };

  const handleScreenshotAction = () => {
    viewScreenshots([channelId]);
  };

  const handleGalleryAction = () => {
    setGalleryModal({
      collectionItemId: "",
      collectionIds: [channelId],
    });
  };

  const handleThumbnailNavigate = () => {
    navigate(`/channels/${makeYtChannelId(ytChannelId)}/thumbnails`);
  };

  const handleThumbnailAction = () => {
    viewThumbnails({
      channelIds: [channelId],
      idType: IdType.Channel,
    });
  };

  const handleDefaultNavigate = () => {
    navigate(`/channels/${makeYtChannelId(ytChannelId)}`);
  };

  const handleSavedNavigate = () => {
    navigate(`/channels/${makeYtChannelId(ytChannelId)}/saved`);
  };

  const items = [
    { name: "storyboards", count: storyboardArtifactsCount },
    { name: "screenshots", count: screenshotArtifactsCount },
    { name: "gallery", count: screenshotArtifactsCount },
    { name: "thumbnails", count: thumbnailArtifactsCount },
    { name: "default", count: videoArtifactsCount },
    { name: "saved", count: savedArtifactsCount },
  ];

  const actions = {
    storyboards: {
      onNavigate: handleStoryboardNavigate,
      onFirst: handleStoryboardAction,
    },
    screenshots: {
      onNavigate: handleScreenshotNavigate,
      onFirst: handleScreenshotAction,
    },
    gallery: {
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
  };

  return <Iterator items={items} actions={actions} />;
};
