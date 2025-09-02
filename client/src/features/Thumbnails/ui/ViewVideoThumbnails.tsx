import { type UploadsWithThumbnailsResponse } from "@shared/api";
import { setProcessingData } from "@shared/store";
import { Button } from "@shared/ui";

export function ViewVideoThumbnails({
  ytChannelId,
  ytVideoId,
  channelTitle,
}: {
  ytChannelId: string;
  ytVideoId: string;
  channelTitle: string;
}) {
  const handleViewThumbnails = () => {
    setProcessingData("thumbnails", [
      {
        ytChannelId,
        ytVideoId,
        channelTitle,
      },
    ] as UploadsWithThumbnailsResponse[]);
  };

  return <Button onClick={handleViewThumbnails}>Thumbnails</Button>;
}
