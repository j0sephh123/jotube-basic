import { useThumbnailsProcessingState } from "@shared/store";
import { useGetThumbnail } from "@features/Thumbnails";

export default function useThumbnailsCount() {
  const { items: thumbnailsProcessingData } = useThumbnailsProcessingState();
  const { data } = useGetThumbnail({
    videoId: thumbnailsProcessingData[0]?.videoId ?? 0,
    type: "upload",
  });
  return data?.thumbnailsCount || 0;
}
