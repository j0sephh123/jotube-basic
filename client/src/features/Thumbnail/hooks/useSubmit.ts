import { useStore } from "@/store/store";
import { useCallback } from "react";
import { useFinishProcessingUpload } from "@/features/Upload/hooks/useFinishProcessingUpload";
import { useRefetchGroupedThumbnails } from "../../Dashboard/views/ThumbnailsView/useThumbnailsView";
import { useRefetchTotalScreenshots } from "@/features/Screenshot/hooks/useTotalScreenshots";
import { useRefetchTotalThumbnails } from "./useTotalThumbnails";
import { useRefetchThumbnailByVideoId } from "./useThumbnailByVideoId";

export default function useSubmit() {
  const {
    thumbnailsProcessingData,
    setThumbnailsProcessingData,
    selectedImages,
    setSelectedImages,
  } = useStore();
  const refetchGroupedThumbnails = useRefetchGroupedThumbnails();
  const refetchTotalScreenshots = useRefetchTotalScreenshots();
  const refetchTotalThumbnails = useRefetchTotalThumbnails();
  const refetchThumbnailByVideoId = useRefetchThumbnailByVideoId(
    thumbnailsProcessingData[0]?.ytVideoId
  );
  const refetchAll = () => {
    refetchGroupedThumbnails();
    refetchTotalScreenshots();
    refetchTotalThumbnails();
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
