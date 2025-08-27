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
  onFavorite: (screenshot: ChannelScreenshot) => void;
  onDelete: (screenshot: ChannelScreenshot) => void;
  onImageClick: (screenshot: ChannelScreenshot) => void;
};

export default function GalleryItem({
  screenshot,
  onFavorite,
  onDelete,
  onImageClick,
}: Props) {
  const { openVideoModal } = useVideoModalStore();

  return (
    <>
      <div className="flex-1 relative group">
        <div
          className="aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
          onClick={() =>
            openVideoModal(screenshot.ytVideoId, screenshot.second)
          }
        >
          <Image src={screenshot.src} />
          <TopLabels second={screenshot.second} />
          <div className="absolute inset-0 transition-all duration-200 opacity-0 group-hover:opacity-100">
            <FavoriteButton screenshot={screenshot} onFavorite={onFavorite} />
            <DeleteButton screenshot={screenshot} onDelete={onDelete} />
            <ZoomButton screenshot={screenshot} onImageClick={onImageClick} />
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
