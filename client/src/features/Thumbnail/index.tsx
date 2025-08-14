import { useThumbnailsSlice } from "@/store/store";
import { useThumbnailByVideoId } from "@/features/Thumbnail/hooks/useThumbnailByVideoId";
import ThumbnailsProcessingContent from "./components/ThumbnailsProcessingContent";

export default function ThumbnailsProcessing() {
  const { thumbnailsProcessingData, metadata } = useThumbnailsSlice();
  const { data, isLoading } = useThumbnailByVideoId(metadata.ytVideoId);

  if (thumbnailsProcessingData.length === 0 || isLoading || !data) {
    return null;
  }

  return <ThumbnailsProcessingContent />;
}
