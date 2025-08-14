import Button from "@/shared/button";
import useArtifacts from "@/features/Thumbnail/hooks/useArtifacts";

type Props = {
  id: number;
  thumbnailArtifactsCount: number;
};

export default function ViewThumbnails({ id, thumbnailArtifactsCount }: Props) {
  const { viewThumbnails } = useArtifacts();

  const handleViewThumbnails = () => {
    viewThumbnails([id]);
  };

  return (
    <Button onClick={handleViewThumbnails}>
      Thumbnails ({thumbnailArtifactsCount})
    </Button>
  );
}
