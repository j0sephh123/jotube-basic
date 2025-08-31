import {
  useThumbnailByVideoId,
  ThumbnailsProcessingContent,
} from "@features/Thumbnails";
import { useProcessingState } from "@shared/store";

export default function ThumbnailsProcessing() {
  const { items: thumbnailsProcessingData } = useProcessingState();
  const { data, isLoading } = useThumbnailByVideoId(
    thumbnailsProcessingData[0]?.ytVideoId ?? undefined
  );

  if (thumbnailsProcessingData.length === 0 || isLoading || !data) {
    return null;
  }

  return <ThumbnailsProcessingContent />;
}
