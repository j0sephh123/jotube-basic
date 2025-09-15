import { useThumbnailsProcessingState } from "@shared/store";
import { useGetThumbnail } from "@features/Thumbnails";

export default function useIsLastItem() {
  const { items: thumbnailsProcessingData, currentIndex } =
    useThumbnailsProcessingState();
  const { data } = useGetThumbnail(
    { videoId: thumbnailsProcessingData[0]?.videoId ?? 0, type: "upload" }
  );
  const thumbnailsCount = data?.thumbnailsCount || 0;

  return thumbnailsCount === 0 ? false : currentIndex === thumbnailsCount - 1;
}
