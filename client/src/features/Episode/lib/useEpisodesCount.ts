import { useEpisodesProcessingState } from "@shared/store";
import { useGetThumbnail } from "@features/Thumbnails";

export default function useEpisodesCount() {
  const { items: episodesProcessingData } = useEpisodesProcessingState();
  const episodeId = episodesProcessingData[0]?.episodeId ?? 0;
  const { data } = useGetThumbnail({
    videoId: episodeId,
    type: "episode",
  });
  return data?.thumbnailsCount || 0;
}
