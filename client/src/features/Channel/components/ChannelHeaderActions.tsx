/* eslint-disable boundaries/element-types */
/* eslint-disable import/no-internal-modules */
import ViewThumbnails from "../../../widgets/ChannelHeader/ui/ViewThumbnails";
import { ViewScreenshots } from "@features/Thumbnails";
import { ViewStoryboards } from "@widgets/Storyboard";
import { setGalleryModal } from "@features/Gallery/model/galleryModalStore";
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";

interface TopRightProps {
  channelId: number;
}

export const ChannelHeaderActions = ({ channelId }: TopRightProps) => {
  const { data: channelMetadata } = useChannelMetadataQuery(channelId);

  if (!channelMetadata) return null;

  const {
    screenshotArtifactsCount,
    id,
    thumbnailArtifactsCount,
    storyboardArtifactsCount,
  } = channelMetadata;

  const handleGalleryClick = () => {
    setGalleryModal({
      ytVideoId: "",
      channelIds: [channelId],
    });
  };

  return (
    <>
      <span className="text-sm font-medium text-base-content/70">actions</span>
      <ViewStoryboards
        channelId={channelId}
        storyboardArtifactsCount={storyboardArtifactsCount}
      />
      <ViewThumbnails
        id={id}
        thumbnailArtifactsCount={thumbnailArtifactsCount}
      />
      <ViewScreenshots
        channelId={channelId}
        screenshotArtifactsCount={screenshotArtifactsCount}
      />
      <button onClick={handleGalleryClick} className="btn btn-sm">
        Image Viewer ({screenshotArtifactsCount})
      </button>
    </>
  );
};
