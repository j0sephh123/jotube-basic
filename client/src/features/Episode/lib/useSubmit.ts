import {
  setProcessingData,
  setSelectedImages,
  setCurrentIndex,
  useEpisodesProcessingState,
} from "@shared/store";
import { useCallback } from "react";
import { useFinishProcessingEpisode } from "@features/Episode";
import { useRefetchTotalCounts } from "@features/Statistics";
import { useRefetchGetThumbnail } from "@features/Thumbnails";
import { useRefetchChannelsDashboardQuery } from "@features/Dashboard";

export default function useSubmit() {
  const refetchChannelsDashboard = useRefetchChannelsDashboardQuery();
  const { items: episodesProcessingData, selectedItems: selectedImages } =
    useEpisodesProcessingState();
  const refetchTotalCounts = useRefetchTotalCounts();
  const refetchThumbnailByEpisodeId = useRefetchGetThumbnail({
    videoId: episodesProcessingData[0]?.episodeId ?? 0,
    type: "episode",
  });
  const refetchAll = () => {
    refetchTotalCounts();
    refetchThumbnailByEpisodeId();
  };

  const finishProcessingEpisodeM = useFinishProcessingEpisode(() => {
    setSelectedImages([]);
    setCurrentIndex(0);
    setProcessingData("episodes", episodesProcessingData.slice(1));
    refetchAll();
    refetchChannelsDashboard();
  });

  const handleSubmit = useCallback(() => {
    if (episodesProcessingData.length === 0 || !episodesProcessingData[0]) {
      return;
    }

    finishProcessingEpisodeM({
      finishProcessEpisodeInput: {
        tvIdentifier: episodesProcessingData[0].tvIdentifier,
        episodeIdentifier: episodesProcessingData[0].episodeIdentifier,
        savedSeconds: selectedImages as number[],
      },
    });
  }, [finishProcessingEpisodeM, selectedImages, episodesProcessingData]);

  return handleSubmit;
}
