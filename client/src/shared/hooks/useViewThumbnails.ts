import { useGetUploadsWithThumbnails } from "@/features/Thumbnail/hooks/useGetUploadsWithThumbnails";
import { useStore } from "@/store/store";

export default function useViewThumbnails(id: number) {
  const { setThumbnailsProcessingData } = useStore();
  const { mutateAsync: getUploadsWithThumbnailsMutation } =
    useGetUploadsWithThumbnails();

  return async () => {
    const thumbnails = await getUploadsWithThumbnailsMutation([id]);
    setThumbnailsProcessingData(thumbnails);
  };
}
