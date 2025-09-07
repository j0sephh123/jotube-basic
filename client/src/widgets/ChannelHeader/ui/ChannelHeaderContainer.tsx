import { ChannelHeader } from "./index";
import {
  ChannelTitleSection,
  ChannelActions,
  ChannelUploadsLinks,
  ChannelControls,
} from "@features/Channel";
// eslint-disable-next-line import/no-internal-modules
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";
import { useLocation } from "react-router-dom";

export const ChannelHeaderContainer = ({
  channelId,
  ytChannelId,
}: {
  channelId: number;
  ytChannelId: string;
}) => {
  const { data: channelMetadata, refetch: refetchMetadata } =
    useChannelMetadataQuery(channelId);
  const location = useLocation();
  const isUploadsPage = location.pathname.includes("/default");
  const isSavedPage = location.pathname.includes("/saved");
  const isThumbnailsPage = location.pathname.includes("/thumbnails");
  const isScreenshotsPage = location.pathname.includes("/screenshots");
  const isGalleryPage = location.pathname.includes("/gallery");

  if (!channelMetadata) return null;

  const {
    title,
    screenshotArtifactsCount,
    id,
    thumbnailArtifactsCount,
    videoCount,
    fetchedUntilEnd,
    storyboardArtifactsCount,
    playlist,
    videoArtifactsCount,
    savedArtifactsCount,
  } = channelMetadata;

  const topLeft = (
    <ChannelTitleSection
      title={title}
      id={id}
      ytChannelId={ytChannelId}
      playlist={playlist}
      isUploadsPage={isUploadsPage}
      channelMetadata={channelMetadata}
      channelId={channelId}
    />
  );

  const topRight = (
    <ChannelActions
      channelId={channelId}
      storyboardArtifactsCount={storyboardArtifactsCount}
      id={id}
      thumbnailArtifactsCount={thumbnailArtifactsCount}
      screenshotArtifactsCount={screenshotArtifactsCount}
      fetchedUntilEnd={fetchedUntilEnd}
      videoCount={videoCount}
      onRefetchMetadata={refetchMetadata}
    />
  );

  const bottomRight = (
    <ChannelUploadsLinks
      ytChannelId={ytChannelId}
      isUploadsPage={isUploadsPage}
      isSavedPage={isSavedPage}
      isThumbnailsPage={isThumbnailsPage}
      isScreenshotsPage={isScreenshotsPage}
      isGalleryPage={isGalleryPage}
      videoArtifactsCount={videoArtifactsCount}
      savedArtifactsCount={savedArtifactsCount}
      thumbnailArtifactsCount={thumbnailArtifactsCount}
      screenshotArtifactsCount={screenshotArtifactsCount}
    />
  );

  return (
    <ChannelHeader
      topLeft={topLeft}
      topRight={topRight}
      bottomLeft={<ChannelControls />}
      bottomRight={bottomRight}
    />
  );
};
