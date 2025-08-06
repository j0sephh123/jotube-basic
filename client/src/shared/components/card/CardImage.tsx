import { useState, useMemo } from "react";
import Avatar from "@/shared/components/Avatar";
import { getPublicImgUrl } from "@/shared/utils/image";
import useViewThumbnails from "@/shared/hooks/useViewThumbnails";

type CardImageProps = {
  id: number;
  ytId: string;
  src: string;
  ytChannelId?: string;
  screenshots?: {
    ytVideoId: string;
    second: number;
  }[];
  className?: string;
};

function CardImage({
  id,
  ytId,
  src,
  ytChannelId,
  screenshots,
  className = "",
}: CardImageProps) {
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  const handleThumbnailClick = useViewThumbnails(id);

  const computedSrc = useMemo(() => {
    if (
      screenshots &&
      screenshots.length &&
      screenshots.length > 0 &&
      screenshots[0]?.ytVideoId
    ) {
      return getPublicImgUrl(
        ytChannelId || ytId,
        screenshots[screenshotIndex]?.ytVideoId || "0",
        screenshots[screenshotIndex]?.second || 0,
        "saved_screenshots"
      );
    }

    return src;
  }, [screenshots, screenshotIndex, ytChannelId, ytId, src]);

  const handleAvatarClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    handleThumbnailClick();
    if (screenshots && screenshots.length > 0) {
      setScreenshotIndex((prev) => (prev + 1) % screenshots.length);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Avatar
        ytId={ytId}
        id={id}
        src={computedSrc}
        className={`w-full h-36 object-cover cursor-pointer`}
        onClick={handleAvatarClick}
      />
    </div>
  );
}

export default CardImage;
