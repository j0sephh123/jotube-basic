import { useGetUploadsWithThumbnails } from "@features/Thumbnails";
import { setThumbnailsProcessingData } from "@features/Thumbnails/model/thumbnailsStore";

export default function useViewThumbnails(id: number) {
  const getUploadsWithThumbnails = useGetUploadsWithThumbnails();

  return async () => {
    const thumbnails = await getUploadsWithThumbnails.mutateAsync([id]);
    setThumbnailsProcessingData(thumbnails);
  };
}
