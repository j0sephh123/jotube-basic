import { useZoom } from "@features/Screenshot";
import { useSubmit, useEpisodesCount, usePaginate } from "@features/Episode";
import { clearProcessingData, useEpisodesProcessingState } from "@shared/store";

export default function useHandleKeyDown() {
  const { handlePrevious, handleNext } = usePaginate();
  const { currentIndex } = useEpisodesProcessingState();
  const episodesCount = useEpisodesCount();
  const { url } = useZoom();
  const handleSubmit = useSubmit();
  return (event: KeyboardEvent) => {
    if (url) return;

    const maxIndex = episodesCount;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        if (episodesCount === 0 || currentIndex > 0) {
          handlePrevious();
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (episodesCount === 0 || currentIndex < maxIndex) {
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
