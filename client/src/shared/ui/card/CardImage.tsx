import { useState } from "react";
import { Avatar } from "@shared/ui";
// eslint-disable-next-line boundaries/element-types
import { useSavedScreenshot } from "@features/Channel";

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
  onThumbnailClick: () => void;
};

function CardImage({
  id,
  ytId,
  src,
  ytChannelId,
  screenshots,
  className = "",
  onThumbnailClick,
}: CardImageProps) {
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  const computedSrc = useSavedScreenshot(
    screenshots,
    ytChannelId,
    ytId,
    src,
    screenshotIndex
  );

  const handleAvatarClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    onThumbnailClick();
    if (screenshots && screenshots.length > 0) {
      setScreenshotIndex((prev) => (prev + 1) % screenshots.length);
    }
  };

  return (
    <div data-testid="card-image" className={`relative ${className}`}>
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
