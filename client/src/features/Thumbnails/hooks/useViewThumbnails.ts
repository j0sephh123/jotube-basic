import { useGetUploadsWithThumbnails } from "@features/Thumbnails";
import { setProcessingData } from "@shared/store";

export default function useViewThumbnails(channelId: number) {
  const getUploadsWithThumbnails = useGetUploadsWithThumbnails();

  return async () => {
    const thumbnails = await getUploadsWithThumbnails.mutateAsync([channelId]);
    setProcessingData("thumbnails", thumbnails);
  };
}
