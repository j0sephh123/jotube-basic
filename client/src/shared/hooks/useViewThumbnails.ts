import { useGetUploadsWithThumbnails } from "@widgets/Thumbnails/lib/useGetUploadsWithThumbnails";
import { useStore } from "@store/store";

export default function useViewThumbnails(id: number) {
  const { setThumbnailsProcessingData } = useStore();
  const getUploadsWithThumbnails =
    useGetUploadsWithThumbnails();

  return async () => {
    const thumbnails = await getUploadsWithThumbnails.mutateAsync([id]);
    setThumbnailsProcessingData(thumbnails);
  };
}
