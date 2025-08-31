import {
  useThumbnailsState,
  useThumbnailByVideoId,
  ThumbnailsProcessingContent,
} from "@features/Thumbnails";

export default function ThumbnailsProcessing() {
  const { thumbnailsProcessingData } = useThumbnailsState();
  const { data, isLoading } = useThumbnailByVideoId(thumbnailsProcessingData[0]?.ytVideoId ?? undefined);

  if (thumbnailsProcessingData.length === 0 || isLoading || !data) {
    return null;
  }

  return <ThumbnailsProcessingContent />;
}
