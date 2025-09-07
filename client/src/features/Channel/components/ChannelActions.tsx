/* eslint-disable boundaries/element-types */
/* eslint-disable import/no-internal-modules */
import ViewThumbnails from "../../../widgets/ChannelHeader/ui/ViewThumbnails";
import { ViewScreenshots } from "@features/Thumbnails";
import { ViewStoryboards } from "@widgets/Storyboard";
import { FetchUploadsButton } from "@features/Upload";
import { setGalleryModal } from "@features/Gallery/model/galleryModalStore";

interface TopRightProps {
  channelId: number;
  storyboardArtifactsCount: number;
  id: number;
  thumbnailArtifactsCount: number;
  screenshotArtifactsCount: number;
  fetchedUntilEnd: boolean;
  videoCount: number;
  onRefetchMetadata: () => void;
}

export const ChannelActions = ({
  channelId,
  storyboardArtifactsCount,
  id,
  thumbnailArtifactsCount,
  screenshotArtifactsCount,
  fetchedUntilEnd,
  videoCount,
  onRefetchMetadata,
}: TopRightProps) => {
  const handleGalleryClick = () => {
    setGalleryModal({
      ytVideoId: "",
      channelIds: [channelId],
    });
  };

  return (
    <div className="flex items-center gap-2">
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
      {!fetchedUntilEnd && (
        <FetchUploadsButton
          channelId={channelId}
          videoCount={videoCount}
          onSuccess={onRefetchMetadata}
        />
      )}
    </div>
  );
};
