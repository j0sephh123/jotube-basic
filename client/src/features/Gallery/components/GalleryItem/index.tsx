import { useVideoModalStore } from "@shared/hooks";
import { type ChannelScreenshot } from "@features/Screenshot";
import DeleteButton from "./DeleteButton";
import ZoomButton from "./ZoomButton";
import FavoriteButton from "./FavoriteButton";
import TopLabels from "./TopLabels";
import Image from "./Image";
import VideoButton from "./VideoButton";

type Props = {
  screenshot: ChannelScreenshot;
  index: number;
  isFav?: boolean;
  onFavorite: (index: number) => void;
  onDelete: (index: number) => void;
  onImageClick: (index: number) => void;
};

export default function GalleryItem({
  screenshot,
  index,
  isFav,
  onFavorite,
  onDelete,
  onImageClick,
}: Props) {
  const { openVideoModal } = useVideoModalStore();

  const handleGalleryItemClick = () => {
    openVideoModal(screenshot.ytVideoId, screenshot.second);
    onImageClick(index);
  };

  return (
    <>
      <div className="flex-1 relative group">
        <div
          className="aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
          onClick={handleGalleryItemClick}
        >
          <Image src={screenshot.src} />
          <TopLabels isFav={isFav} second={screenshot.second} />
          <div className="absolute inset-0 transition-all duration-200 opacity-0 group-hover:opacity-100">
            <FavoriteButton index={index} onFavorite={onFavorite} />
            <DeleteButton index={index} onDelete={onDelete} />
            <ZoomButton index={index} onImageClick={onImageClick} />
            <VideoButton
              ytVideoId={screenshot.ytVideoId}
              second={screenshot.second}
              onVideoClick={openVideoModal}
            />
          </div>
        </div>
      </div>
    </>
  );
}
