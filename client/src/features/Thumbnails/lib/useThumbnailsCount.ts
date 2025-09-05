import { useThumbnailsProcessingState } from "@shared/store";
import { useThumbnailByVideoId } from "@features/Thumbnails";

export default function useThumbnailsCount() {
  const { items: thumbnailsProcessingData } = useThumbnailsProcessingState();
  const { data } = useThumbnailByVideoId(
    thumbnailsProcessingData[0]?.videoId ?? 0
  );
  return data?.thumbnailsCount || 0;
}
