import { memo } from "react";
import { useThumbnailsSlice } from "@/store/store";
import { generateMainThumbnailUrl } from "../utils/generateMainThumbnailUrl";

const ThumbnailImage = memo(() => {
  const { metadata, currentIndex } = useThumbnailsSlice();
  const { ytChannelId, ytVideoId } = metadata;
  const src = generateMainThumbnailUrl(ytChannelId, ytVideoId, currentIndex);

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
