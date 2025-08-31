import { useZoom } from "@features/Screenshot";
import {
  useSubmit,
  useThumbnailsCount,
  usePaginate,
} from "@features/Thumbnails";
import { clearProcessingData, useThumbnailsProcessingState } from "@shared/store";

export default function useHandleKeyDown() {
  const { handlePrevious, handleNext } = usePaginate();
  const { currentIndex } = useThumbnailsProcessingState();
  const thumbnailsCount = useThumbnailsCount();
  const { url } = useZoom();
  const handleSubmit = useSubmit();
  return (event: KeyboardEvent) => {
    if (url) return;

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
        clearProcessingData();
        break;
    }
  };
}
