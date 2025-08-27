import { useEffect } from "react";
import { useThumbnailsSlice } from "@features/Thumbnails";
import useThumbnailsCount from "./useThumbnailsCount";
import { useZoom } from "@features/Screenshot";

export default function useEvents(
  handleKeyDown: (event: KeyboardEvent) => void,
  handleContainerWheel: (event: WheelEvent) => void,
  containerRef: React.RefObject<HTMLDivElement>
) {
  const thumbnailsCount = useThumbnailsCount();
  const { isVisible: isZoomModalVisible } = useZoom();
  const { currentIndex } = useThumbnailsSlice();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, thumbnailsCount, isZoomModalVisible, handleKeyDown]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleContainerWheel, {
        passive: false,
      });
      return () => {
        container.removeEventListener("wheel", handleContainerWheel);
      };
    }
  }, [
    currentIndex,
    thumbnailsCount,
    isZoomModalVisible,
    containerRef,
    handleContainerWheel,
  ]);
}
