import { useProcessingState } from "@shared/store";
import { useThumbnailByVideoId } from "@features/Thumbnails";

export default function useThumbnailsCount() {
  const { items: thumbnailsProcessingData } = useProcessingState();
  const { data } = useThumbnailByVideoId(
    thumbnailsProcessingData[0]?.ytVideoId ?? undefined
  );
  return data?.thumbnailsCount || 0;
}
