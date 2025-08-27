import { useThumbnailsSlice,   } from "@features/Thumbnails";
import { useThumbnailsCount, usePaginate, useSubmit } from "@features/Thumbnails";
import { useZoomStore } from "@features/Screenshot";

export default function useHandleContainerWheel() {
  const { handlePrevious, handleNext } = usePaginate();
  const { currentIndex } = useThumbnailsSlice();
  const thumbnailsCount = useThumbnailsCount();
  const { isVisible: isZoomModalVisible } = useZoomStore();
  const handleSubmit = useSubmit();
  return (event: WheelEvent) => {
    if (isZoomModalVisible) return;

    event.preventDefault();
    const deltaY = event.deltaY;

    if (deltaY > 0) {
      const maxIndex = thumbnailsCount;
      if (thumbnailsCount === 0 || currentIndex < maxIndex) {
        handleNext();
      } else {
        handleSubmit();
      }
    } else if (deltaY < 0) {
      if (thumbnailsCount === 0 || currentIndex > 0) {
        handlePrevious();
      }
    }
  };
}
