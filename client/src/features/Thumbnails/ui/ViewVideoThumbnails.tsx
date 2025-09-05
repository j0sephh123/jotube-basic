import { type UploadsWithThumbnailsResponse } from "@shared/api";
import { setProcessingData } from "@shared/store";
import { Button } from "@shared/ui";

export function ViewVideoThumbnails({
  ytChannelId,
  videoId,
  channelTitle,
  ytVideoId,
}: {
  ytChannelId: string;
  videoId: number;
  channelTitle: string;
  ytVideoId: string;
}) {
  const handleViewThumbnails = () => {
    setProcessingData("thumbnails", [
      {
        ytChannelId,
        channelTitle,
        videoId,
        ytVideoId,
      },
    ] as UploadsWithThumbnailsResponse[]);
  };

  return <Button onClick={handleViewThumbnails}>Thumbnails</Button>;
}
