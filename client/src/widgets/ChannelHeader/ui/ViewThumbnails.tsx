import { Button } from "@shared/ui";
import { useViewThumbnails } from "@features/Thumbnails";

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
