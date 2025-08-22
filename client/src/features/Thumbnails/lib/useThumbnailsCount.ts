import { useThumbnailsSlice } from "@features/Thumbnails";
import { useThumbnailByVideoId } from "@features/Thumbnails";

export default function useThumbnailsCount() {
  const { metadata } = useThumbnailsSlice();
  const { data } = useThumbnailByVideoId(metadata.ytVideoId);
  return data?.thumbnailsCount || 0;
}
