import { useGetUploadsWithThumbnails } from "@features/Thumbnails";
import { setProcessingData } from "@shared/store";

export default function useViewThumbnails(id: number) {
  const getUploadsWithThumbnails = useGetUploadsWithThumbnails();

  return async () => {
    const thumbnails = await getUploadsWithThumbnails.mutateAsync([id]);
    setProcessingData(thumbnails);
  };
}
