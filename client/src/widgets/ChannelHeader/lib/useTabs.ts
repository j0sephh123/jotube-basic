import { useTypedChannelYtId } from "@features/Dashboard";
import { useChannelMetadataQuery } from "@entities/Channel";

export const useTabs = () => {
  const ytChannelId = useTypedChannelYtId();
  const { data: metadata } = useChannelMetadataQuery(ytChannelId);

  if (!metadata) return [];

  const {
    videoArtifactsCount,
    savedArtifactsCount,
    screenshotArtifactsCount,
    storyboardArtifactsCount,
  } = metadata;

  return [
    {
      where: "index" as const,
      label: "Uploads",
      count: videoArtifactsCount,
    },
    {
      where: "saved" as const,
      label: "Saved",
      count: savedArtifactsCount,
    },
    {
      where: "storyboard" as const,
      label: "Storyboard",
      count: storyboardArtifactsCount,
    },
    {
      where: "gallery" as const,
      label: "Gallery",
      count: screenshotArtifactsCount,
    },
    {
      where: "new-gallery" as const,
      label: "New Gallery",
      count: 0,
    },
  ] as const;
};
