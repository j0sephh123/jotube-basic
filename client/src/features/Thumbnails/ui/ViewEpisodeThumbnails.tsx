import { setProcessingData } from "@shared/store";
import { Button } from "@shared/ui";

export function ViewEpisodeThumbnails({
  tvIdentifier,
  episodeIdentifier,
  episodeId,
}: {
  tvIdentifier: string;
  episodeIdentifier: string;
  episodeId: number;
}) {
  const handleViewThumbnails = () => {
    setProcessingData("episodes", [
      {
        tvIdentifier,
        episodeIdentifier,
        episodeId,
      },
    ]);
  };

  return <Button onClick={handleViewThumbnails}>Thumbnails</Button>;
}
