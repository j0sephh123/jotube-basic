type Props = {
  metadata:
    | {
        thumbnailArtifactsCount: number;
        screenshotArtifactsCount: number;
      }
    | undefined;
  onViewThumbnails: () => void;
  onViewScreenshots: () => void;
};

const ChannelActions = ({
  metadata,
  onViewThumbnails,
  onViewScreenshots,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={onViewThumbnails} className="btn btn-sm btn-outline">
        <span className="flex items-center gap-1">
          Thumbnails ({metadata?.thumbnailArtifactsCount})
        </span>
      </button>
      <button onClick={onViewScreenshots} className="btn btn-sm btn-outline">
        <span className="flex items-center gap-1">
          Screenshots ({metadata?.screenshotArtifactsCount})
        </span>
      </button>
    </div>
  );
};

export default ChannelActions;
