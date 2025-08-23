import { useGetUploadsWithThumbnails, useThumbnailsSlice } from "@features/Thumbnails";

  export default function useViewThumbnails(id: number) {
  const { setThumbnailsProcessingData } = useThumbnailsSlice();
  const getUploadsWithThumbnails = useGetUploadsWithThumbnails();

  return async () => {
    const thumbnails = await getUploadsWithThumbnails.mutateAsync([id]);
    setThumbnailsProcessingData(thumbnails);
  };
}
