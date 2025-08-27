/* eslint-disable boundaries/element-types */
/* eslint-disable import/no-internal-modules */
import {
  IconGallery,
  IconNewGallery,
  IconStoryboard,
  IconUploads,
  IconSaved,
} from "@shared/ui";
import { useChannelMetadataQuery } from "@entities/Channel";
import { useGalleryModal } from "@app/providers";

export default function Tabs({ ytChannelId }: { ytChannelId: string }) {
  const { data } = useChannelMetadataQuery(ytChannelId);
  const { setGalleryModal } = useGalleryModal();

  if (!data) return [];

  const {
    videoArtifactsCount,
    savedArtifactsCount,
    screenshotArtifactsCount,
    storyboardArtifactsCount,
  } = data;

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

  const handleGalleryClick = () => {
    setGalleryModal({
      ytVideoId: "",
      ytChannelId: ytChannelId,
    });
  };

  const newGallery = (
    <IconNewGallery
      onClick={handleGalleryClick}
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
