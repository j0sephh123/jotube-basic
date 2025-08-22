import { useThumbnailsSlice, useZoom } from "@/app/providers/store/store";
import useSubmit from "@/features/Thumbnails/lib/useSubmit";
import useThumbnailsCount from "@/features/Thumbnails/lib/useThumbnailsCount";
import usePaginate from "@/features/Thumbnails/lib/usePaginate";

export default function useHandleKeyDown() {
  const { handlePrevious, handleNext } = usePaginate();
  const { currentIndex, clearThumbnailsProcessingData } = useThumbnailsSlice();
  const thumbnailsCount = useThumbnailsCount();
  const { isVisible: isZoomModalVisible } = useZoom();
  const handleSubmit = useSubmit();
  return (event: KeyboardEvent) => {
    if (isZoomModalVisible) return;

    const maxIndex = thumbnailsCount;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        if (thumbnailsCount === 0 || currentIndex > 0) {
          handlePrevious();
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (thumbnailsCount === 0 || currentIndex < maxIndex) {
          handleNext();
        } else {
          handleSubmit();
        }
        break;
      case "Escape":
        event.preventDefault();
        clearThumbnailsProcessingData();
        break;
    }
  };
}
