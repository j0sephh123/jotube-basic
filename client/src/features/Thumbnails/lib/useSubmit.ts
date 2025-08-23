import { useThumbnailsSlice } from "@features/Thumbnails";
import { useCallback } from "react";
import { useFinishProcessingUpload } from "@features/Upload";
import { useRefetchTotalCounts } from "@features/Statistics";
import { useRefetchThumbnailByVideoId } from "@features/Thumbnails";
import { useRefetchChannelsDashboardQuery } from "@features/Dashboard";

export default function useSubmit() {
  const refetchChannelsDashboard = useRefetchChannelsDashboardQuery();
  const {
    thumbnailsProcessingData,
    setThumbnailsProcessingData,
    selectedImages,
    setSelectedImages,
    setCurrentIndex,
  } = useThumbnailsSlice();
  const refetchTotalCounts = useRefetchTotalCounts();
  const refetchThumbnailByVideoId = useRefetchThumbnailByVideoId(
    thumbnailsProcessingData[0]?.ytVideoId
  );
  const refetchAll = () => {
    refetchTotalCounts();
    refetchThumbnailByVideoId();
  };

  const finishProcessingUploadM = useFinishProcessingUpload(() => {
    setSelectedImages([]);
    setCurrentIndex(0);
    setThumbnailsProcessingData(thumbnailsProcessingData.slice(1));
    refetchAll();
    refetchChannelsDashboard();
  });

  const handleSubmit = useCallback(() => {
    if (thumbnailsProcessingData.length === 0 || !thumbnailsProcessingData[0]) {
      return;
    }

    finishProcessingUploadM({
      ytChannelId: thumbnailsProcessingData[0].ytChannelId,
      ytVideoId: thumbnailsProcessingData[0].ytVideoId,
      savedSeconds: selectedImages,
    });
  }, [finishProcessingUploadM, selectedImages, thumbnailsProcessingData]);

  return handleSubmit;
}
