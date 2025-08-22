import { useGetUploadsWithThumbnails } from "@/features/Thumbnails/lib/useGetUploadsWithThumbnails";
import { useStore } from "@/app/providers/store/store";

export default function useViewThumbnails(id: number) {
  const { setThumbnailsProcessingData } = useStore();
  const getUploadsWithThumbnails = useGetUploadsWithThumbnails();

  return async () => {
    const thumbnails = await getUploadsWithThumbnails.mutateAsync([id]);
    setThumbnailsProcessingData(thumbnails);
  };
}
