import Button from "@/shared/ui/button";
import useViewThumbnails from "@features/Thumbnails/hooks/useViewThumbnails";

type Props = {
  id: number;
  thumbnailArtifactsCount: number;
};

export default function ViewThumbnails({ id, thumbnailArtifactsCount }: Props) {
  const viewThumbnails = useViewThumbnails(id);

  const handleViewThumbnails = () => {
    viewThumbnails();
  };

  return (
    <Button onClick={handleViewThumbnails}>
      Thumbnails ({thumbnailArtifactsCount})
    </Button>
  );
}
