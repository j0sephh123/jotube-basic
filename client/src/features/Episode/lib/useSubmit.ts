import {
  setProcessingData,
  setSelectedImages,
  setCurrentIndex,
  useEpisodesProcessingState,
} from "@shared/store";
import { useCallback } from "react";

export default function useSubmit() {
  const { items: episodesProcessingData } = useEpisodesProcessingState();

  const handleSubmit = useCallback(() => {
    if (episodesProcessingData.length === 0 || !episodesProcessingData[0]) {
      return;
    }

    console.log("submit");

    // setSelectedImages([]);
    // setCurrentIndex(0);
    // setProcessingData("episodes", episodesProcessingData.slice(1));
  }, [episodesProcessingData]);

  return handleSubmit;
}
