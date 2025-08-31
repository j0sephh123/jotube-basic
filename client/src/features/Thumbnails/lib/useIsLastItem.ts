import { useThumbnailsState } from "@features/Thumbnails";
import { useThumbnailByVideoId } from "@features/Thumbnails";

export default function useIsLastItem() {
  const { thumbnailsProcessingData, currentIndex } = useThumbnailsState();
  const { data } = useThumbnailByVideoId(thumbnailsProcessingData[0]?.ytVideoId ?? undefined);
  const thumbnailsCount = data?.thumbnailsCount || 0;

  return thumbnailsCount === 0 ? false : currentIndex === thumbnailsCount - 1;
}
