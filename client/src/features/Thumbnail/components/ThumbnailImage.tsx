import { forwardRef, memo } from "react";
import { useStore } from "@/store/store";
import { imagesBasePath } from "@/shared/utils/image";

const generateMainThumbnailUrl = (
  ytChannelId: string,
  ytVideoId: string,
  index: number,
  cacheBuster?: number
): string =>
  `${imagesBasePath}/${ytChannelId}/${ytVideoId}/thumbnails/${index}.png${
    cacheBuster ? `?v=${cacheBuster}` : ""
  }`;

type Props = {
  onLoad: () => void;
  cacheBuster: number;
  index: number;
};

const ThumbnailImage = memo(
  forwardRef<HTMLImageElement, Props>(({ onLoad, cacheBuster, index }, ref) => {
    const { metadata } = useStore();
    const { ytChannelId, ytVideoId } = metadata;
    const src = generateMainThumbnailUrl(
      ytChannelId,
      ytVideoId,
      index,
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
