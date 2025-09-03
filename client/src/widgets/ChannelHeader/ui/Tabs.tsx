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
import { setGalleryModal } from "@features/Gallery/model/galleryModalStore";
// eslint-disable-next-line import/no-internal-modules
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";
import { YtIdToId } from "@shared/hoc";

function TabsInner({
  ytChannelId,
  channelId,
}: {
  ytChannelId: string;
  channelId: number;
}) {
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
    <IconScreenshots
      ytChannelId={ytChannelId}
      count={screenshotArtifactsCount}
    />
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

const Tabs = YtIdToId(TabsInner);
export default Tabs;
