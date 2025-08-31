import { useEffect } from "react";
import { useThumbnailsProcessingState } from "@shared/store";
import useThumbnailsCount from "./useThumbnailsCount";

export default function useEvents(
  handleKeyDown: (event: KeyboardEvent) => void,
  handleContainerWheel: (event: WheelEvent) => void,
  containerRef: React.RefObject<HTMLDivElement>
) {
  const thumbnailsCount = useThumbnailsCount();
  const { currentIndex } = useThumbnailsProcessingState();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, thumbnailsCount, handleKeyDown]);

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
  }, [currentIndex, thumbnailsCount, containerRef, handleContainerWheel]);
}
