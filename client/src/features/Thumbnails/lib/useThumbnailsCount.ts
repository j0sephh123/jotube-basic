import { useThumbnailsProcessingState } from "@shared/store";
import { useThumbnailByVideoId } from "@features/Thumbnails";

export default function useThumbnailsCount() {
  const { items: thumbnailsProcessingData } = useThumbnailsProcessingState();
  const { data } = useThumbnailByVideoId(
    thumbnailsProcessingData[0]?.ytVideoId ?? undefined
  );
  return data?.thumbnailsCount || 0;
}
