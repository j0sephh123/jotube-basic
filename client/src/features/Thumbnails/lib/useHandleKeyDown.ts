import { useZoomStore } from "@features/Screenshot";
import {
  useThumbnailsSlice,
  useSubmit,
  useThumbnailsCount,
  usePaginate,
} from "@features/Thumbnails";

export default function useHandleKeyDown() {
  const { handlePrevious, handleNext } = usePaginate();
  const { currentIndex, clearThumbnailsProcessingData } = useThumbnailsSlice();
  const thumbnailsCount = useThumbnailsCount();
  const { isVisible: isZoomModalVisible } = useZoomStore();
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
