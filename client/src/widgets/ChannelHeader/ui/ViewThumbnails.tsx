import { Button } from "@shared/ui";
import { useViewThumbnails } from "@features/Thumbnails";
import { IdType } from "@shared/api";

type Props = {
  id: number;
  thumbnailArtifactsCount: number;
};

export default function ViewThumbnails({ id, thumbnailArtifactsCount }: Props) {
  const viewThumbnails = useViewThumbnails({
    channelIds: [id],
    idType: IdType.Channel,
  });

  const handleViewThumbnails = () => {
    viewThumbnails();
  };

  return (
    <Button onClick={handleViewThumbnails}>
      Thumbnails ({thumbnailArtifactsCount})
    </Button>
  );
}
