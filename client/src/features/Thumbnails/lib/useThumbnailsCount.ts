import { useThumbnailsSlice } from "@/app/providers/store/store";
import { useThumbnailByVideoId } from "@/features/Thumbnails/lib/useThumbnailByVideoId";

export default function useThumbnailsCount() {
  const { metadata } = useThumbnailsSlice();
  const { data } = useThumbnailByVideoId(metadata.ytVideoId);
  return data?.thumbnailsCount || 0;
}
