import { useTypedChannelYtId } from "@shared/hooks/useDashboardParams";
import { useChannelMetadataQuery } from "@features/Channel/hooks/useChannelMetadata";

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
      where: "storyboard" as const,
      label: "Storyboard",
      count: storyboardArtifactsCount,
    },
    {
      where: "saved" as const,
      label: "Saved",
      count: savedArtifactsCount,
    },
    {
      where: "gallery" as const,
      label: "Gallery",
      count: screenshotArtifactsCount,
    },
  ] as const;
};
