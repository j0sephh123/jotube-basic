import { useThumbnailsSlice } from "@/app/providers/store/store";
import { useThumbnailByVideoId } from "@/features/Thumbnails/lib/useThumbnailByVideoId";
import ThumbnailsProcessingContent from "@/features/Thumbnails/ui/ThumbnailsProcessingContent";

export default function ThumbnailsProcessing() {
  const { thumbnailsProcessingData, metadata } = useThumbnailsSlice();
  const { data, isLoading } = useThumbnailByVideoId(metadata.ytVideoId);

  if (thumbnailsProcessingData.length === 0 || isLoading || !data) {
    return null;
  }

  return <ThumbnailsProcessingContent />;
}
