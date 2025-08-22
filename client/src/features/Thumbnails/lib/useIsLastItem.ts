import { useThumbnailsSlice } from "@/app/providers/store/store";
import { useThumbnailByVideoId } from "@/features/Thumbnails/lib/useThumbnailByVideoId";

export default function useIsLastItem() {
  const { metadata, currentIndex } = useThumbnailsSlice();
  const { data } = useThumbnailByVideoId(metadata.ytVideoId);
  const thumbnailsCount = data?.thumbnailsCount || 0;

  return thumbnailsCount === 0 ? false : currentIndex === thumbnailsCount - 1;
}
