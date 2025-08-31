/* eslint-disable boundaries/element-types */
/* eslint-disable import/no-internal-modules */
import {
  IconGallery,
  IconNewGallery,
  IconUploads,
  IconSaved,
} from "@shared/ui";
import { useChannelMetadataQuery } from "@entities/Channel";
import { setGalleryModal } from "@features/Gallery/model/galleryModalStore";

export default function Tabs({ ytChannelId }: { ytChannelId: string }) {
  const { data } = useChannelMetadataQuery(ytChannelId);

  if (!data) return [];

  const {
    videoArtifactsCount,
    savedArtifactsCount,
    screenshotArtifactsCount,
  } = data;

  const uploads = (
    <IconUploads ytChannelId={ytChannelId} count={videoArtifactsCount} />
  );

  const saved = (
    <IconSaved ytChannelId={ytChannelId} count={savedArtifactsCount} />
  );

  const gallery = <IconGallery ytChannelId={ytChannelId} />;

  const handleGalleryClick = () => {
    setGalleryModal({
      ytVideoId: "",
      ytChannelIds: [ytChannelId],
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
      {gallery}
      {newGallery}
    </>
  );
}
