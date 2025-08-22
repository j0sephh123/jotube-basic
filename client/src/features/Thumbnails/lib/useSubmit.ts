import { useThumbnailsSlice } from "@/app/providers/store/store";
import { useCallback } from "react";
import { useFinishProcessingUpload } from "@features/Upload/hooks/useFinishProcessingUpload";
import { useRefetchTotalCounts } from "@features/Statistics/hooks/useTotalCounts";
import { useRefetchThumbnailByVideoId } from "@/features/Thumbnails/lib/useThumbnailByVideoId";
import { useRefetchGroupedThumbnails } from "@widgets/Dashboard/api/useChannelsDashboardQuery";

export default function useSubmit() {
  const {
    thumbnailsProcessingData,
    setThumbnailsProcessingData,
    selectedImages,
    setSelectedImages,
  } = useThumbnailsSlice();
  const refetchGroupedThumbnails = useRefetchGroupedThumbnails();
  const refetchTotalCounts = useRefetchTotalCounts();
  const refetchThumbnailByVideoId = useRefetchThumbnailByVideoId(
    thumbnailsProcessingData[0]?.ytVideoId
  );
  const refetchAll = () => {
    refetchGroupedThumbnails();
    refetchTotalCounts();
    refetchThumbnailByVideoId();
  };

  const finishProcessingUploadM = useFinishProcessingUpload(() => {
    setSelectedImages([]);
    setThumbnailsProcessingData(thumbnailsProcessingData.slice(1));
    refetchAll();
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
