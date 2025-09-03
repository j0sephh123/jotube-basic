/* eslint-disable boundaries/element-types */
/* eslint-disable import/no-internal-modules */
import {
  IconGallery,
  IconNewGallery,
  IconUploads,
  IconSaved,
  IconThumbnails,
  IconScreenshots,
} from "@shared/ui";
import { useChannelMetadataQuery } from "@entities/Channel";
import { setGalleryModal } from "@features/Gallery/model/galleryModalStore";

export default function Tabs({ ytChannelId, channelId }: { ytChannelId: string, channelId: number }) {
  const { data } = useChannelMetadataQuery(channelId);

  if (!data) return [];

  const {
    videoArtifactsCount,
    savedArtifactsCount,
    screenshotArtifactsCount,
    thumbnailArtifactsCount,
  } = data;

  const uploads = (
    <IconUploads ytChannelId={ytChannelId} count={videoArtifactsCount} />
  );

  const saved = (
    <IconSaved ytChannelId={ytChannelId} count={savedArtifactsCount} />
  );

  const thumbnails = (
    <IconThumbnails ytChannelId={ytChannelId} count={thumbnailArtifactsCount} />
  );  

  const screenshots = (
    <IconScreenshots ytChannelId={ytChannelId} count={screenshotArtifactsCount} />
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
      {thumbnails}
      {screenshots}
      {gallery}
      {newGallery}
    </>
  );
}
