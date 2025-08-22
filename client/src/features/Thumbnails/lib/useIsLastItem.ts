import { useThumbnailsSlice } from "@features/Thumbnails";
import { useThumbnailByVideoId } from "@features/Thumbnails";

export default function useIsLastItem() {
  const { metadata, currentIndex } = useThumbnailsSlice();
  const { data } = useThumbnailByVideoId(metadata.ytVideoId);
  const thumbnailsCount = data?.thumbnailsCount || 0;

  return thumbnailsCount === 0 ? false : currentIndex === thumbnailsCount - 1;
}
