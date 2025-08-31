import { useThumbnailsState } from "@features/Thumbnails";
import { useThumbnailByVideoId } from "@features/Thumbnails";

export default function useThumbnailsCount() {
  const { thumbnailsProcessingData } = useThumbnailsState();
  const { data } = useThumbnailByVideoId(
    thumbnailsProcessingData[0]?.ytVideoId ?? undefined
  );
  return data?.thumbnailsCount || 0;
}
