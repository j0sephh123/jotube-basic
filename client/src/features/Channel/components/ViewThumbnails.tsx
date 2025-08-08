import Button from "@/shared/button";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";

type Props = {
  id: number;
  thumbnailArtifactsCount: number;
};

export default function ViewThumbnails({
  id,
  thumbnailArtifactsCount,
}: Props) {
  const { viewThumbnails } = useArtifacts();

  const handleViewThumbnails = () => {
    viewThumbnails([id]);
  };

  return (
    <Button
      onClick={handleViewThumbnails}
      color="accent"
      variant="outline"
      size="sm"
    >
      Thumbnails ({thumbnailArtifactsCount})
    </Button>
  );
}
