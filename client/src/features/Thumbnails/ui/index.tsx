import {
  useThumbnailByVideoId,
  ThumbnailsProcessingContent,
} from "@features/Thumbnails";
import { useThumbnailsProcessingState } from "@shared/store";

export default function ThumbnailsProcessing() {
  const { items: thumbnailsProcessingData } = useThumbnailsProcessingState();
  const { data, isLoading } = useThumbnailByVideoId(
    thumbnailsProcessingData[0]?.ytVideoId ?? undefined
  );

  if (thumbnailsProcessingData.length === 0 || isLoading || !data) {
    return null;
  }

  return <ThumbnailsProcessingContent />;
}
