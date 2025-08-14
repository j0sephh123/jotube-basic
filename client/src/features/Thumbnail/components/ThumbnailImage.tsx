import { forwardRef, memo, RefObject } from "react";
import { useThumbnailsSlice } from "@/store/store";
import { generateMainThumbnailUrl } from "../utils/generateMainThumbnailUrl";
import { useGridCalculator } from "../hooks/useGridCalculator";

type Props = {
  cacheBuster: number;
};

const ThumbnailImage = memo(
  forwardRef<HTMLImageElement, Props>(({ cacheBuster }, ref) => {
    const { calculateGridData } = useGridCalculator(
      ref as RefObject<HTMLImageElement>
    );

    const onLoad = () => {
      calculateGridData();
    };
    const { metadata, currentIndex } = useThumbnailsSlice();
    const { ytChannelId, ytVideoId } = metadata;
    const src = generateMainThumbnailUrl(
      ytChannelId,
      ytVideoId,
      currentIndex,
      cacheBuster
    );

    return (
      <img
        className="w-full"
        style={{ display: "block" }}
        ref={ref}
        src={src}
        alt="Thumbnail"
        onLoad={onLoad}
      />
    );
  })
);

ThumbnailImage.displayName = "ThumbnailImage";

export default ThumbnailImage;
