import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";

type Props = {
  ytChannelId: string;
  id: number;
  thumbnailArtifactsCount: number;
  screenshotArtifactsCount: number;
};

const ChannelActions = ({
  ytChannelId,
  id,
  thumbnailArtifactsCount,
  screenshotArtifactsCount,
}: Props) => {
  const { viewThumbnails, getScreenshots } = useArtifacts();
  const handleViewThumbnails = () => {
    viewThumbnails([id]);
  };

  const handleViewScreenshots = () => {
    getScreenshots([ytChannelId]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={handleViewThumbnails} className="btn btn-sm btn-outline">
        <span className="flex items-center gap-1">
          Thumbnails ({thumbnailArtifactsCount})
        </span>
      </button>
      <button
        onClick={handleViewScreenshots}
        className="btn btn-sm btn-outline"
      >
        <span className="flex items-center gap-1">
          Screenshots ({screenshotArtifactsCount})
        </span>
      </button>
    </div>
  );
};

export default ChannelActions;
