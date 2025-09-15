import { useEpisodesProcessingState } from "@shared/store";
import { useGetThumbnail } from "@features/Thumbnails";

export default function useIsLastItem() {
  const { items: episodesProcessingData, currentIndex } =
    useEpisodesProcessingState();
  const { data } = useGetThumbnail({
    videoId: episodesProcessingData[0]?.episodeId ?? 0,
    type: "episode",
  });
  const episodesCount = data?.thumbnailsCount || 0;

  return episodesCount === 0 ? false : currentIndex === episodesCount - 1;
}
