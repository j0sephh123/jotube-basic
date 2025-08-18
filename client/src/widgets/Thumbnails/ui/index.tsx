import { useThumbnailsSlice } from "@store/store";
import { useThumbnailByVideoId } from "@widgets/Thumbnails/lib/useThumbnailByVideoId";
import ThumbnailsProcessingContent from "@widgets/Thumbnails/ui/ThumbnailsProcessingContent";

export default function ThumbnailsProcessing() {
  const { thumbnailsProcessingData, metadata } = useThumbnailsSlice();
  const { data, isLoading } = useThumbnailByVideoId(metadata.ytVideoId);

  if (thumbnailsProcessingData.length === 0 || isLoading || !data) {
    return null;
  }

  return <ThumbnailsProcessingContent />;
}
