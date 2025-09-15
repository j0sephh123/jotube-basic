import { useEffect } from "react";
import { useEpisodesProcessingState } from "@shared/store";
import useEpisodesCount from "./useEpisodesCount";

export default function useEvents(
  handleKeyDown: (event: KeyboardEvent) => void,
  handleContainerWheel: (event: WheelEvent) => void,
  containerRef: React.RefObject<HTMLDivElement>
) {
  const episodesCount = useEpisodesCount();
  const { currentIndex } = useEpisodesProcessingState();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, episodesCount, handleKeyDown]);

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
  }, [currentIndex, episodesCount, containerRef, handleContainerWheel]);
}
