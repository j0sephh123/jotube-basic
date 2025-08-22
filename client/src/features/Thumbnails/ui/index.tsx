import {
  useThumbnailsSlice,
  useThumbnailByVideoId,
  ThumbnailsProcessingContent,
} from "@features/Thumbnails";

export default function ThumbnailsProcessing() {
  const { thumbnailsProcessingData, metadata } = useThumbnailsSlice();
  const { data, isLoading } = useThumbnailByVideoId(metadata.ytVideoId);

  if (thumbnailsProcessingData.length === 0 || isLoading || !data) {
    return null;
  }

  return <ThumbnailsProcessingContent />;
}
