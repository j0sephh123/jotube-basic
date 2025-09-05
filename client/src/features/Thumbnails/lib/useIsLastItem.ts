import { useThumbnailsProcessingState } from "@shared/store";
import { useThumbnailByVideoId } from "@features/Thumbnails";

export default function useIsLastItem() {
  const { items: thumbnailsProcessingData, currentIndex } =
    useThumbnailsProcessingState();
  const { data } = useThumbnailByVideoId(
    thumbnailsProcessingData[0]?.videoId ?? 0
  );
  const thumbnailsCount = data?.thumbnailsCount || 0;

  return thumbnailsCount === 0 ? false : currentIndex === thumbnailsCount - 1;
}
