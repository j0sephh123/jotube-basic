import { type EpisodesWithThumbnailsResponse } from "@shared/api";
import { setProcessingData } from "@shared/store";
import { Button } from "@shared/ui";

export function ViewEpisodeThumbnails({
  tvIdentifier,
  episodeIdentifier,
}: {
  tvIdentifier: string;
  episodeIdentifier: string;
}) {
  const handleViewThumbnails = () => {
    setProcessingData("episodes", [
      {
        tvIdentifier,
        episodeIdentifier,
      },
    ] as EpisodesWithThumbnailsResponse[]);
  };

  return <Button onClick={handleViewThumbnails}>Thumbnails</Button>;
}
