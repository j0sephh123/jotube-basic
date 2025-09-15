import { useEpisodesProcessingState } from "@shared/store";
import { useEpisodesCount, usePaginate, useSubmit } from "@features/Episode";
import { useZoom } from "@features/Screenshot";

export default function useHandleContainerWheel() {
  const { handlePrevious, handleNext } = usePaginate();
  const { currentIndex } = useEpisodesProcessingState();
  const episodesCount = useEpisodesCount();
  const { url } = useZoom();
  const handleSubmit = useSubmit();
  return (event: WheelEvent) => {
    if (url) return;

    event.preventDefault();
    const deltaY = event.deltaY;

    if (deltaY > 0) {
      const maxIndex = episodesCount;
      if (episodesCount === 0 || currentIndex < maxIndex) {
        handleNext();
      } else {
        handleSubmit();
      }
    } else if (deltaY < 0) {
      if (episodesCount === 0 || currentIndex > 0) {
        handlePrevious();
      }
    }
  };
}
