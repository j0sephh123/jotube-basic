import { memo } from "react";
import {
  useThumbnailsState,
  generateMainThumbnailUrl,
} from "@features/Thumbnails";

const ThumbnailImage = memo(() => {
  const { thumbnailsProcessingData, currentIndex } = useThumbnailsState();
  const { ytChannelId, ytVideoId } = thumbnailsProcessingData[0] ?? {};
  const src = generateMainThumbnailUrl(ytChannelId ?? "", ytVideoId ?? "", currentIndex);

  return (
    <img
      className="w-full"
      style={{ display: "block" }}
      src={src}
      alt="Thumbnail"
    />
  );
});

export default ThumbnailImage;
