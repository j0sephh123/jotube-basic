import { useThumbnailsSlice } from "@store/store";
import { useThumbnailByVideoId } from "@widgets/Thumbnails/lib/useThumbnailByVideoId";

export default function useThumbnailsCount() {
  const { metadata } = useThumbnailsSlice();
  const { data } = useThumbnailByVideoId(metadata.ytVideoId);
  return data?.thumbnailsCount || 0;
}