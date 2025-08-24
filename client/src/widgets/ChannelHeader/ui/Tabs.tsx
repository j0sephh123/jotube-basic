import {
  IconGallery,
  IconNewGallery,
  IconStoryboard,
  IconUploads,
  IconSaved,
} from "@shared/ui";
import { useChannelMetadataQuery } from "@entities/Channel";

export default function Tabs({ ytChannelId }: { ytChannelId: string }) {
  const { data: metadata } = useChannelMetadataQuery(ytChannelId);

  if (!metadata) return [];

  const {
    videoArtifactsCount,
    savedArtifactsCount,
    screenshotArtifactsCount,
    storyboardArtifactsCount,
  } = metadata;

  const uploads = (
    <IconUploads ytChannelId={ytChannelId} count={videoArtifactsCount} />
  );

  const saved = (
    <IconSaved ytChannelId={ytChannelId} count={savedArtifactsCount} />
  );

  const storyboard = (
    <IconStoryboard
      ytChannelId={ytChannelId}
      count={storyboardArtifactsCount}
    />
  );

  const gallery = <IconGallery ytChannelId={ytChannelId} />;
  const newGallery = (
    <IconNewGallery
      ytChannelId={ytChannelId}
      count={screenshotArtifactsCount}
    />
  );

  return (
    <>
      {uploads}
      {saved}
      {storyboard}
      {gallery}
      {newGallery}
    </>
  );
}
