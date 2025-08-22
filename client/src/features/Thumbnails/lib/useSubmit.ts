import { useThumbnailsSlice } from "@features/Thumbnails";
import { useCallback } from "react";
import { useFinishProcessingUpload } from "@features/Upload";
import { useRefetchTotalCounts } from "@features/Statistics"; 
import { useRefetchThumbnailByVideoId } from "@features/Thumbnails";
import { useRefetchGroupedThumbnails } from "@features/Dashboard";

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
