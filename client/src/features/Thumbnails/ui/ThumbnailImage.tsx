import { memo } from "react";
import { generateMainThumbnailUrl } from "@features/Thumbnails";
import { useProcessingState } from "@shared/store";

const ThumbnailImage = memo(() => {
  const { items: thumbnailsProcessingData, currentIndex } =
    useProcessingState();
  const { ytChannelId, ytVideoId } = thumbnailsProcessingData[0] ?? {};
  const src = generateMainThumbnailUrl(
    ytChannelId ?? "",
    ytVideoId ?? "",
    currentIndex
  );

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
